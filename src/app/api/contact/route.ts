import { NextResponse } from 'next/server';
import { z } from 'zod';

const ContactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  company: z.string().min(1).max(120),
  role: z.string().min(1).max(60),
  teamSize: z.string().min(1).max(20),
  goal: z.string().max(2000).optional().default(''),
  source: z.string().max(60).optional().default(''),
  locale: z.string().max(5).optional().default('es'),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'validation', details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = {
    ...parsed.data,
    submittedAt: new Date().toISOString(),
  };

  // 1. Forward to Google Sheets webhook (Apps Script Web App)
  const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (sheetsUrl) {
    try {
      await fetch(sheetsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error('[contact] sheets webhook failed', err);
    }
  }

  // 2. Send email via Resend
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL || 'adreamhub@gmail.com';
  if (resendKey) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Adream Landing <noreply@adream.io>',
          to,
          subject: `Nuevo lead — ${data.name} (${data.company})`,
          html: `
            <h2>Nuevo lead desde la landing</h2>
            <p><b>Nombre:</b> ${escapeHtml(data.name)}</p>
            <p><b>Email:</b> ${escapeHtml(data.email)}</p>
            <p><b>Empresa:</b> ${escapeHtml(data.company)}</p>
            <p><b>Rol:</b> ${escapeHtml(data.role)}</p>
            <p><b>Tamaño equipo:</b> ${escapeHtml(data.teamSize)}</p>
            <p><b>Objetivo:</b> ${escapeHtml(data.goal)}</p>
            <p><b>Fuente:</b> ${escapeHtml(data.source)}</p>
            <p><b>Idioma:</b> ${escapeHtml(data.locale)}</p>
            <p><b>Recibido:</b> ${data.submittedAt}</p>
          `,
        }),
      });
    } catch (err) {
      console.error('[contact] resend failed', err);
    }
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

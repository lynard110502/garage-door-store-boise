import { useState } from "react";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { z } from "zod";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL, services } from "@/data/site";

function FieldIcon({ name }: { name: keyof typeof fieldIcons }) {
  const Icon = fieldIcons[name];
  return <Icon size={14} aria-hidden="true" />;
}

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name."),
  phone: z.string().trim().min(7, "Enter a phone number."),
  email: z.string().trim().email("Enter a valid email."),
  city: z.string().trim().min(2, "Enter your city."),
  service: z.string().min(1, "Choose a service."),
  message: z.string().trim().min(8, "Tell us a little about the door or the problem."),
});

type Fields = z.infer<typeof schema>;

const empty: Fields = {
  name: "",
  phone: "",
  email: "",
  city: "",
  service: "Garage door repair",
  message: "",
};

const fieldIcons = { name: User, phone: Phone, email: Mail, city: MapPin } as const;

export function EstimateForm({ id = "estimate", compact = false }: { id?: string; compact?: boolean }) {
  const [values, setValues] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<"idle" | "ready">("idle");
  const [copied, setCopied] = useState(false);

  function bodyFor(v: Fields) {
    return [
      "Estimate request — Garage Door Store Boise",
      `Name: ${v.name}`,
      `Phone: ${v.phone}`,
      `Email: ${v.email}`,
      `City: ${v.city}`,
      `Service: ${v.service}`,
      "",
      v.message,
    ].join("\n");
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<keyof Fields, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Fields;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setStatus("idle");
      return;
    }
    setErrors({});
    const body = bodyFor(parsed.data);
    const href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Free estimate — ${parsed.data.city}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    setStatus("ready");
  }

  async function copyRequest() {
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      onSubmit({ preventDefault() {} } as React.FormEvent);
      return;
    }
    try {
      await navigator.clipboard.writeText(`To: ${EMAIL}\n\n${bodyFor(parsed.data)}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  function set<K extends keyof Fields>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  return (
    <form id={id} className={compact ? "form is-compact" : "form"} onSubmit={onSubmit} noValidate>
      {compact ? null : <p className="kicker">Estimate request</p>}
      {compact ? null : <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>Tell us about the opening.</h2>}
      {compact ? null : (
        <p className="form-note is-wide">
          There is no hosted form inbox connected yet. Submitting opens your email app with a message addressed
          to {EMAIL}. Nothing is stored on this site. If mail does not open, call{" "}
          <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>.
        </p>
      )}
      {(
        [
          ["name", "Name", "text"],
          ["phone", "Phone", "tel"],
          ["email", "Email", "email"],
          ["city", "City", "text"],
        ] as const
      ).map(([key, label, type]) => (
        <div className="field" key={key}>
          <label htmlFor={`${id}-${key}`}>
            {compact ? <FieldIcon name={key} /> : null}
            {label}
          </label>
          <input
            id={`${id}-${key}`}
            name={key}
            type={type}
            autoComplete={key === "name" ? "name" : key}
            value={values[key]}
            onChange={(e) => set(key, e.target.value)}
          />
          {errors[key] && <span className="err">{errors[key]}</span>}
        </div>
      ))}
      <div className="field is-wide">
        <label htmlFor={`${id}-service`}>Service</label>
        <select
          id={`${id}-service`}
          name="service"
          value={values.service}
          onChange={(e) => set("service", e.target.value)}
        >
          {services.map((s) => (
            <option key={s.id}>{s.title}</option>
          ))}
          <option>Not sure yet</option>
        </select>
      </div>
      <div className="field is-wide">
        <label htmlFor={`${id}-message`}>What is going on</label>
        <textarea
          id={`${id}-message`}
          name="message"
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
        />
        {errors.message && <span className="err">{errors.message}</span>}
      </div>
      <div className="form-actions is-wide">
        <button className="btn btn-signal" type="submit">
          Email this request
        </button>
        <button className="btn btn-ghost" type="button" onClick={copyRequest}>
          {copied ? "Copied" : "Copy request"}
        </button>
        <a className="btn btn-ghost" href={PHONE_TEL}>
          Call instead
        </a>
      </div>
      {status === "ready" && (
        <p className="form-note is-wide" role="status">
          Your email app should open a draft to {EMAIL}. This page did not submit the request to a server, and
          it has not been booked. If the draft did not open, use Copy request or call {PHONE_DISPLAY}.
        </p>
      )}
      {compact && (
        <p className="form-note is-wide">
          Opens an email to {EMAIL}. Nothing is stored on this site.
        </p>
      )}
    </form>
  );
}

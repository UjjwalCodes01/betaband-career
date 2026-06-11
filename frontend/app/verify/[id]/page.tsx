import { prisma } from "@/lib/prisma";
import { CheckCircle2, XCircle, Award, Shield } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const cert = await prisma.certificate.findUnique({ where: { id: id.toUpperCase() } });
  if (!cert) return { title: "Certificate Not Found | BeatBand™" };
  return {
    title: `${cert.candidateName} — Verified | BeatBand™`,
    description: `Certificate issued to ${cert.candidateName} for ${cert.roleOrCourse}, verified by BeatBand™.`,
  };
}

export default async function VerifyCertPage({ params }: Props) {
  const { id } = await params;
  const upperCaseId = id.toUpperCase();
  const cert = await prisma.certificate.findUnique({ where: { id: upperCaseId } });

  return (
    <main className="min-h-[85vh] bg-[#F8F8F7] flex items-center justify-center px-5 sm:px-8 py-12">
      <div className="max-w-lg w-full">

        {cert ? (
          <div className="anim-fade-up">
            {/* Verified banner */}
            <div className="verified-frame p-5 mb-5 flex items-center gap-3">
              <CheckCircle2 size={22} className="shrink-0" style={{ color: "#2D7A5C" }} />
              <div>
                <p className="font-bold text-sm" style={{ color: "#1D5C43" }}>Certificate Verified</p>
                <p className="text-[12px]" style={{ color: "#4A8F70" }}>
                  This certificate was issued by {cert.issuedBy} and is authentic.
                </p>
              </div>
            </div>

            {/* Certificate card */}
            <div className="cert-card p-6 sm:p-8 mb-5">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-md flex items-center justify-center text-[#F8F8F7] font-black text-xs"
                    style={{ background: "#3D5476" }}>
                    BB
                  </div>
                  <div>
                    <p className="font-bold text-[13px]" style={{ color: "#232327" }}>BeatBand™</p>
                    <p className="text-[11px]" style={{ color: "#9DA3AC" }}>Certificate of Recognition</p>
                  </div>
                </div>
                <Award size={24} style={{ color: "#3D5476" }} />
              </div>

              <div className="divider mb-6" />

              {/* Name */}
              <div className="text-center mb-6">
                <p className="section-label mb-2">This certifies that</p>
                <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "#232327" }}>
                  {cert.candidateName}
                </h2>
              </div>

              <div className="divider mb-6" />

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Role / Course", value: cert.roleOrCourse },
                  { label: "Issued By", value: cert.issuedBy },
                  {
                    label: "Issue Date",
                    value: new Date(cert.issueDate).toLocaleDateString("en-IN", {
                      day: "2-digit", month: "long", year: "numeric"
                    })
                  },
                  { label: "Certificate ID", value: cert.id, mono: true },
                ].map((f) => (
                  <div key={f.label} className="bg-[#F8F8F7] rounded-xl p-4 border border-[#E8EAED]">
                    <p className="section-label mb-1">{f.label}</p>
                    <p
                      className={`text-sm font-semibold ${f.mono ? "font-mono tracking-wider" : ""}`}
                      style={{ color: f.mono ? "#3D5476" : "#232327" }}
                    >
                      {f.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Verified badge */}
              <div className="mt-5 flex items-center justify-center gap-2 py-3 rounded-xl border border-[#E8EAED] text-[12px] font-medium"
                style={{ color: "#5C6F8C" }}>
                <Shield size={13} />
                Verified on {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
              </div>
            </div>

            <div className="text-center">
              <Link href="/verify" className="btn-outline text-[13px] px-6 py-2.5 inline-flex items-center gap-2">
                ← Verify Another
              </Link>
            </div>
          </div>

        ) : (
          <div className="anim-fade-up text-center">
            {/* Invalid banner */}
            <div className="invalid-frame p-5 mb-5 flex items-center gap-3 text-left">
              <XCircle size={22} className="shrink-0 text-red-400" />
              <div>
                <p className="font-bold text-sm text-red-700">Certificate Not Found</p>
                <p className="text-[12px] text-red-500">
                  No record found for ID: <code className="font-mono font-bold">{upperCaseId}</code>
                </p>
              </div>
            </div>

            <div className="card p-6 text-left mb-5">
              <p className="text-sm font-semibold mb-3" style={{ color: "#232327" }}>This could mean:</p>
              <ul className="space-y-2 text-[13px]" style={{ color: "#5C6F8C" }}>
                {[
                  "The ID was entered or scanned incorrectly",
                  "The certificate has been revoked",
                  "This certificate was never issued by BeatBand™",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#9DA3AC" }} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/verify" className="btn justify-center">Try Again</Link>
              <a href="mailto:hello@beatband.in" className="btn-outline justify-center flex items-center gap-2">
                Contact Support
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

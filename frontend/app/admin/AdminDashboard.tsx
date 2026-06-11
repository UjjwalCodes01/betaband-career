"use client";
import { useState, useRef } from "react";
import QRCode from "qrcode";
import {
  Award, User, Briefcase, Calendar, Building2,
  CheckCircle2, Loader2, Download, Clipboard, Trash2, ChevronDown
} from "lucide-react";

interface Certificate {
  id: string;
  candidateName: string;
  roleOrCourse: string;
  issueDate: string;
  issuedBy: string;
  createdAt: string;
}

export default function AdminPage() {
  const [form, setForm] = useState({
    candidateName: "",
    roleOrCourse: "",
    issueDate: new Date().toISOString().split("T")[0],
    issuedBy: "BeatBand™",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Certificate | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [showList, setShowList] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setQrDataUrl("");
    try {
      const res = await fetch("/api/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      const cert: Certificate = data.certificate;
      setResult(cert);
      const verifyUrl = `${window.location.origin}/verify/${cert.id}`;
      const qr = await QRCode.toDataURL(verifyUrl, {
        width: 240,
        margin: 1,
        color: { dark: "#232327", light: "#F8F8F7" },
      });
      setQrDataUrl(qr);
      setForm({ ...form, candidateName: "", roleOrCourse: "" });
    } catch (err: unknown) {
      alert("Error: " + (err instanceof Error ? err.message : "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  const copyId = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = () => {
    if (!qrDataUrl || !result) return;
    const a = document.createElement("a");
    a.href = qrDataUrl;
    a.download = `beatband-cert-${result.id}.png`;
    a.click();
  };

  const loadCerts = async () => {
    setLoadingList(true);
    setShowList(true);
    try {
      const res = await fetch("/api/certificates");
      const data = await res.json();
      setCerts(data.certificates || []);
    } catch {
      alert("Failed to load certificates");
    } finally {
      setLoadingList(false);
    }
  };

  const deleteCert = async (id: string) => {
    if (!confirm(`Delete certificate ${id}?`)) return;
    await fetch(`/api/certificates/${id}`, { method: "DELETE" });
    setCerts((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <main className="min-h-screen bg-[#F8F8F7] px-5 sm:px-8 py-10 sm:py-14">
      <div className="max-w-xl mx-auto">

        {/* Page header */}
        <div className="mb-8">
          <p className="section-label mb-1.5">Certificate Engine</p>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ color: "#232327" }}>
            Issue a Certificate
          </h1>
          <p className="text-[13px] mt-2" style={{ color: "#9DA3AC" }}>
            Fill in candidate details to generate a verifiable certificate with QR code.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card p-6 sm:p-7 space-y-5 mb-6">
          <div>
            <label className="label"><User size={12} className="inline mr-1" />Candidate Name</label>
            <input
              type="text" name="candidateName" value={form.candidateName}
              onChange={handleChange} required placeholder="e.g. Rohan Sharma"
              className="input"
            />
          </div>

          <div>
            <label className="label"><Briefcase size={12} className="inline mr-1" />Role / Course / Achievement</label>
            <input
              type="text" name="roleOrCourse" value={form.roleOrCourse}
              onChange={handleChange} required placeholder="e.g. Brand Intern, Sales Champion"
              className="input"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label"><Calendar size={12} className="inline mr-1" />Issue Date</label>
              <input
                type="date" name="issueDate" value={form.issueDate}
                onChange={handleChange} required className="input"
              />
            </div>
            <div>
              <label className="label"><Building2 size={12} className="inline mr-1" />Issued By</label>
              <input
                type="text" name="issuedBy" value={form.issuedBy}
                onChange={handleChange} className="input"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn w-full justify-center py-2.5">
            {loading
              ? <><Loader2 size={15} className="animate-spin" /> Generating…</>
              : <><Award size={15} /> Generate Certificate</>
            }
          </button>
        </form>

        {/* Result */}
        {result && qrDataUrl && (
          <div className="card p-6 sm:p-7 mb-6 anim-fade-up">
            <div className="flex items-center gap-2 mb-5 text-sm font-semibold" style={{ color: "#3D5476" }}>
              <CheckCircle2 size={18} /> Certificate generated
            </div>

            <div className="flex flex-col sm:flex-row gap-5 items-start">
              {/* QR */}
              <div ref={qrRef} className="shrink-0 border border-[#E8EAED] rounded-xl p-3 bg-[#F8F8F7]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrDataUrl} alt="QR Code" className="w-36 h-36 sm:w-40 sm:h-40" />
              </div>

              {/* Details */}
              <div className="flex-1 space-y-4 w-full">
                <div>
                  <p className="section-label mb-1">Certificate ID</p>
                  <div className="flex items-center gap-2">
                    <code className="font-mono font-bold text-base tracking-widest" style={{ color: "#3D5476" }}>
                      {result.id}
                    </code>
                    <button onClick={copyId} className="btn-ghost p-1.5">
                      <Clipboard size={14} />
                    </button>
                    {copied && <span className="text-xs" style={{ color: "#9DA3AC" }}>Copied</span>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[13px]">
                  <div>
                    <p className="section-label mb-0.5">Candidate</p>
                    <p className="font-semibold" style={{ color: "#232327" }}>{result.candidateName}</p>
                  </div>
                  <div>
                    <p className="section-label mb-0.5">Role / Course</p>
                    <p style={{ color: "#5C6F8C" }}>{result.roleOrCourse}</p>
                  </div>
                  <div>
                    <p className="section-label mb-0.5">Issue Date</p>
                    <p style={{ color: "#5C6F8C" }}>
                      {new Date(result.issueDate).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <div>
                    <p className="section-label mb-0.5">Issued By</p>
                    <p style={{ color: "#5C6F8C" }}>{result.issuedBy}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <button onClick={downloadQR} className="btn text-[13px] py-2 px-4">
                    <Download size={13} /> Download QR
                  </button>
                  <a
                    href={`/verify/${result.id}`} target="_blank" rel="noopener noreferrer"
                    className="btn-outline text-[13px] py-2 px-4"
                  >
                    Preview ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Certificates */}
        <button
          onClick={loadCerts}
          disabled={loadingList}
          className="btn-outline w-full justify-center py-2.5 text-[13px]"
        >
          {loadingList
            ? <Loader2 size={13} className="animate-spin" />
            : <ChevronDown size={13} />
          }
          {showList ? "Refresh" : "View All"} Certificates
        </button>

        {showList && (
          <div className="mt-4 space-y-2 anim-fade-up">
            <p className="text-[13px] font-semibold" style={{ color: "#232327" }}>
              All Certificates ({certs.length})
            </p>
            {certs.length === 0 && (
              <p className="text-[13px]" style={{ color: "#9DA3AC" }}>No certificates issued yet.</p>
            )}
            {certs.map((c) => (
              <div key={c.id} className="card p-4 flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <code className="font-mono text-xs font-bold" style={{ color: "#3D5476" }}>{c.id}</code>
                    <span className="text-sm font-medium truncate" style={{ color: "#232327" }}>{c.candidateName}</span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "#9DA3AC" }}>
                    {c.roleOrCourse} · {new Date(c.issueDate).toLocaleDateString("en-IN")}
                  </p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <a href={`/verify/${c.id}`} target="_blank" rel="noopener noreferrer"
                    className="btn-ghost text-xs p-1.5">↗</a>
                  <button onClick={() => deleteCert(c.id)}
                    className="btn-ghost p-1.5 text-red-400 hover:text-red-500">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

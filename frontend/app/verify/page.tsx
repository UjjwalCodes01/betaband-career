"use client";
import { useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function VerifyHomePage() {
  const [certId, setCertId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = certId.trim().toUpperCase();
    if (!id) return;
    setLoading(true);
    router.push(`/verify/${id}`);
  };

  return (
    <main className="min-h-[85vh] bg-[#F8F8F7] flex items-center justify-center px-5 sm:px-8 py-12">
      <div className="max-w-md w-full">
        <div className="mb-8 text-center">
          <p className="section-label mb-3">Certificate Verification</p>
          <h1 className="text-2xl sm:text-3xl font-black mb-3" style={{ color: "#232327" }}>
            Verify authenticity
          </h1>
          <p className="text-[13px] leading-relaxed" style={{ color: "#9DA3AC" }}>
            Enter the Certificate ID printed on the document or scan the QR code to verify its authenticity instantly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            placeholder="Certificate ID (e.g. AB3XYZ12MNPQ)"
            className="input text-center font-mono tracking-widest text-base"
            style={{ fontSize: "15px" }}
            autoComplete="off"
            spellCheck={false}
          />
          <button
            type="submit"
            disabled={loading || !certId.trim()}
            className="btn w-full justify-center py-3"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
            Verify Certificate
          </button>
        </form>

        <p className="text-center text-[12px] mt-5" style={{ color: "#9DA3AC" }}>
          Certificate IDs are printed on every BeatBand™ document
        </p>
      </div>
    </main>
  );
}

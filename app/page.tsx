import { Briefcase, MapPin, Mail, ArrowRight, Zap, Globe, Heart, Rocket, Users, Gift } from "lucide-react";

const openRoles = [
  {
    title: "Performance Marketing Manager",
    dept: "Growth",
    type: "Full-time",
    location: "Remote / Noida",
    desc: "Own paid media across Meta and Google. Drive ROAS-positive campaigns for our flagship product.",
  },
  {
    title: "Content Creator & Videographer",
    dept: "Brand",
    type: "Full-time",
    location: "Noida",
    desc: "Create short-form video content for Instagram and YouTube showcasing BeatBand in real-life scenarios.",
  },
  {
    title: "Customer Experience Associate",
    dept: "Support",
    type: "Full-time",
    location: "Remote",
    desc: "Delight customers via email and WhatsApp with empathy and speed at every touchpoint.",
  },
  {
    title: "Shopify Developer",
    dept: "Tech",
    type: "Contract",
    location: "Remote",
    desc: "Build and optimise our Shopify storefront, conversion flows, and custom integrations.",
  },
  {
    title: "Operations & Logistics Coordinator",
    dept: "Operations",
    type: "Full-time",
    location: "Noida / Delhi NCR",
    desc: "Manage inventory, vendor coordination, and last-mile delivery quality across India.",
  },
];

const perks = [
  { icon: <Zap size={18} />, title: "Ownership", desc: "Your work directly shapes the brand every day." },
  { icon: <Globe size={18} />, title: "Remote-Friendly", desc: "Most roles offer hybrid or fully remote flexibility." },
  { icon: <Heart size={18} />, title: "Health Benefits", desc: "Medical coverage for all full-time employees." },
  { icon: <Rocket size={18} />, title: "Fast Growth", desc: "Scale your career alongside a growing D2C brand." },
  { icon: <Users size={18} />, title: "Small Team", desc: "No hierarchy — just collaboration and fast execution." },
  { icon: <Gift size={18} />, title: "Product Perks", desc: "Free BeatBand™ and heavy discounts for the team." },
];

const deptColors: Record<string, string> = {
  Growth: "badge-steel",
  Brand: "badge-muted",
  Support: "badge-muted",
  Tech: "badge-steel",
  Operations: "badge-gray",
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-[#F8F8F7]">

      {/* Hero */}
      <section
        className="px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28"
        style={{ background: "#3D5476" }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <span className="badge text-[11px] font-bold uppercase tracking-wider px-3 py-1 mb-6 inline-block"
            style={{ background: "rgba(248,248,247,0.12)", color: "#F8F8F7", borderRadius: "20px" }}>
            We&apos;re Hiring
          </span>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-5"
            style={{ color: "#F8F8F7" }}>
            Help India listen<br />
            <span style={{ color: "#75859E" }}>more comfortably</span>
          </h1>
          <p className="text-base sm:text-lg mb-10 max-w-lg mx-auto" style={{ color: "rgba(248,248,247,0.7)" }}>
            Join BeatBand™ — a lean team building a product people actually use every night.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#openings"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg font-semibold text-sm transition-all"
              style={{ background: "#F8F8F7", color: "#232327" }}
            >
              View Open Roles <ArrowRight size={16} />
            </a>
            <a href="mailto:careers@beatband.in"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg font-semibold text-sm border transition-all"
              style={{ borderColor: "rgba(248,248,247,0.3)", color: "#F8F8F7" }}
            >
              <Mail size={16} /> Reach Out
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-[#E8EAED]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-[#E8EAED]">
          {[
            { val: "5,000+", label: "Customers" },
            { val: "₹1,799", label: "Starting Price" },
            { val: "13 hrs", label: "Battery Life" },
            { val: "Pan India", label: "Free Shipping" },
          ].map((s) => (
            <div key={s.label} className="py-8 px-6 text-center">
              <p className="text-2xl font-black" style={{ color: "#3D5476" }}>{s.val}</p>
              <p className="text-xs mt-1" style={{ color: "#9DA3AC" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Perks */}
      <section className="py-16 sm:py-20 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <p className="section-label mb-2">Why BeatBand™</p>
            <h2 className="text-2xl sm:text-3xl font-black" style={{ color: "#232327" }}>
              Built for builders
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {perks.map((p) => (
              <div key={p.title} className="card p-5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: "rgba(61,84,118,0.08)", color: "#3D5476" }}>
                  {p.icon}
                </div>
                <h3 className="font-bold text-sm mb-1.5" style={{ color: "#232327" }}>{p.title}</h3>
                <p className="text-[13px] leading-relaxed" style={{ color: "#9DA3AC" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto" />

      {/* Open Roles */}
      <section id="openings" className="py-16 sm:py-20 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="section-label mb-2">Open Positions</p>
              <h2 className="text-2xl sm:text-3xl font-black" style={{ color: "#232327" }}>
                {openRoles.length} roles available
              </h2>
            </div>
            <a href="mailto:careers@beatband.in"
              className="text-[13px] flex items-center gap-1.5"
              style={{ color: "#5C6F8C" }}>
              <Mail size={14} /> careers@beatband.in
            </a>
          </div>

          <div className="space-y-3">
            {openRoles.map((role) => (
              <div key={role.title} className="card p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-2.5">
                      <span className={`badge ${deptColors[role.dept] || "badge-gray"}`}>{role.dept}</span>
                      <span className="badge badge-gray">{role.type}</span>
                    </div>
                    <h3 className="font-bold text-[15px] mb-1" style={{ color: "#232327" }}>
                      {role.title}
                    </h3>
                    <div className="flex items-center gap-1 mb-2.5" style={{ color: "#9DA3AC" }}>
                      <MapPin size={12} />
                      <span className="text-xs">{role.location}</span>
                    </div>
                    <p className="text-[13px] leading-relaxed" style={{ color: "#5C6F8C" }}>{role.desc}</p>
                  </div>
                  <a
                    href={`mailto:careers@beatband.in?subject=Application: ${role.title}`}
                    className="btn-outline text-[13px] px-5 py-2 shrink-0 self-start flex items-center gap-1.5"
                  >
                    Apply <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E8EAED] py-8 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px]"
          style={{ color: "#9DA3AC" }}>
          <span>© {new Date().getFullYear()} BeatBand™</span>
          <div className="flex gap-5">
            <a href="https://beatband.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#3D5476] transition-colors">Shop</a>
            <a href="/verify" className="hover:text-[#3D5476] transition-colors">Verify</a>
            <a href="mailto:careers@beatband.in" className="hover:text-[#3D5476] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

import NotificationSignupForm from "@/components/NotificationSignupForm";

export default function NotificationSection() {
  return (
    <section className="bg-mbtDark py-16">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-display text-2xl font-black uppercase tracking-wide text-white sm:text-3xl">
          Get Notified When <span className="text-mbtYellow">Prices Drop</span>
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-white/60">
          Leave your details and we&apos;ll reach out on WhatsApp or SMS the moment fuel
          prices go down.
        </p>
        <NotificationSignupForm />
      </div>
    </section>
  );
}

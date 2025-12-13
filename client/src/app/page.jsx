import ContactForm from "../components/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-10">Welcome to My Site</h1>
      <ContactForm />
    </main>
  );
}

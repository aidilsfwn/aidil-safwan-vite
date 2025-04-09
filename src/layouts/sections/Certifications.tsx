import { certifications } from "../../constants";

export const Certifications = () => {
  return (
    <section id="certifications" className="mb-16">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">Certifications</h2>
      <div className="space-y-4">
        {certifications.map((cert, index) => (
          <div key={index} className="max-w-3xl">
            <h3 className="text-lg font-semibold">{cert.name}</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">{cert.issuer}</span>
              <span className="text-gray-500">{cert.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

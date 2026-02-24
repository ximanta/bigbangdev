import BackButton from '../components/BackButton';

function AboutPage() {
  return (
    <div className="about-page">
      <div className="detail-header">
        <BackButton />
        <h2>About Solar System Explorer</h2>
      </div>
      <p>
        The "Solar System Explorer" is a mobile application designed to provide an engaging and accessible platform
        for users to learn about the Solar System. It aims to democratize astronomical knowledge, offering a visually
        rich and factually accurate resource for students, educators, and space enthusiasts alike.
      </p>
      <p>
        This app allows users to browse detailed profiles for the Sun, all eight planets, major dwarf planets,
        and significant moons. Each profile includes key facts, high-resolution imagery (placeholder in this demo),
        and concise descriptive text. A robust search function allows quick access to specific celestial bodies.
        The application also features a basic interactive 2D model showcasing the relative orbital positions of the planets around the Sun.
      </p>
      <p>
        All data presented is scientifically accurate and sourced from reputable astronomical organizations (e.g., NASA, ESA).
        This application was built with Vite and React, adhering to strict package and styling constraints.
      </p>
      <p>
        <strong className="text-center">Version: 1.0.0</strong>
      </p>
    </div>
  );
}

export default AboutPage;

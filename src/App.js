import { useEffect, useRef, useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <ScrollSpy />
    </div>
  );
}

const ScrollSpy = () => {
  const [selectedSection, setSelectedSection] = useState(0);

  const sectionRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    const observers = sectionRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setSelectedSection(index);
          }
        },
        { threshold: 0.5 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const scrollToSection = (index) => {
    event.preventDefault();
    sectionRefs[index].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const buttonStyle = (index) => ({
    padding: "10px 20px",
    margin: "0 10px",
    backgroundColor: selectedSection === index ? "blue" : "gray",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  });

  const sectionStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2rem",
  };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          padding: "20px",
          backgroundColor: "white",
        }}
      >
        <button style={buttonStyle(0)} onClick={() => scrollToSection(0)}>
          Section 1
        </button>
        <button style={buttonStyle(1)} onClick={() => scrollToSection(1)}>
          Section 2
        </button>
        <button style={buttonStyle(2)} onClick={() => scrollToSection(2)}>
          Section 3
        </button>
      </div>

      <section
        id="0"
        ref={sectionRefs[0]}
        style={{ ...sectionStyle, backgroundColor: "lightblue" }}
      >
        Section 1
      </section>
      <section
        id="1"
        ref={sectionRefs[1]}
        style={{ ...sectionStyle, backgroundColor: "lightgreen" }}
      >
        Section 2
      </section>
      <section
        id="2"
        ref={sectionRefs[2]}
        style={{ ...sectionStyle, backgroundColor: "lightpink" }}
      >
        Section 3
      </section>
    </div>
  );
};

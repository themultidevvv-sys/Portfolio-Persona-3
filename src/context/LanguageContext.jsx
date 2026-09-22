import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

const TRANSLATIONS = {
	en: {
		// Menu
		p3Menu: {
			about: "ABOUT ME",
			resume: "RESUME",
			socials: "SOCIALS",
			mouseHint: "MOUSE HOVER + CLICK",
			navigateHint: "NAVIGATE",
			confirmHint: "CONFIRM",
		},
		// About Me
		aboutMe: {
			title: "About Me",
			subtitle: "Profile Dossier",
			controls: "Keyboard Controls",
			openGithub: "Open GitHub",
			openSocialHub: "Open Social Hub",
			goBack: "Go back",
			tagline: "Elias Taveras, Junior Unity Game Developer & Game Designer",
			aboutText:
				"Currently studying Programming at the Higher School of Computer Science, Instituto Técnico Salesiano (ITESA). I specialize in game development using Unity Engine, C#, and C++, creating gameplay mechanics, real-time UI systems, and interactive experiences.",
			quickFactsTitle: "Quick Facts",
			quickFacts: [
				"Specialized in game development using Unity Engine with C# for core gameplay logic and interactive systems.",
				"Experience in game mechanics programming, real-time UI design, and game architecture (OOAD).",
				"Proficient in C++ for systems programming, data structures, and performance-critical algorithms.",
				"Passionate about game physics, gameplay loop design, and developing engaging 2D/3D video games.",
			],
			linksTitle: "Links",
			backToMenu: "Back to Menu",
			back: "Back",
		},
		// Resume
		resume: {
			navTitle: "Resume",
			skillsTitle: "Skills",
			skillsSubtitle: "Game Development & Technical Stack",
			projectsTitle: "Projects & Demos",
			projectsSubtitle: "Open Project Links",
			detailsTitle: "Details",
			open: "OPEN",
			openLink: "Open Link",
			helperProjects: "Select a project row and press Enter to open the link.",
			helperSkills: "Skills list highlights primary game development tools & languages.",
			skillMeta: {
				"Web Technologies": "Web Technologies",
				"Tools & Technologies": "Tools & Technologies",
				Databases: "Databases",
				"Game Development": "Game Development",
				"Programming Language": "Programming Language",
				"Dev Tools": "Dev Tools",
			},
			skillDetails: {
				Unity:
					"Develops 2D/3D interactive games, gameplay mechanics, and UI systems using the Unity engine with C# scripting.",
				"C#":
					"Writes object-oriented gameplay logic, state machines, and system architecture for Unity games and .NET applications.",
				"C++":
					"Applies low-level programming for performance-critical systems, custom data structures, and game algorithms.",
				React:
					"Builds responsive frontends and web-based portfolio components using component-driven architecture.",
				JavaScript:
					"Uses modern ES features for interactive Web apps and browser-side scripting.",
				TypeScript:
					"Applies type-safe interfaces and models to improve maintainability and software structure.",
				"CSS / Tailwind":
					"Builds stylized UI systems with custom visual designs and responsive layouts.",
				HTML: "Creates structured, accessible document markup for web interfaces.",
				"Git / GitHub":
					"Manages version control, repository branching workflows, and project releases.",
				Linux:
					"Comfortable with terminal commands, system navigation, and developer environments in Linux.",
				PostgreSQL:
					"Designs and manages relational databases with structured queries and data integrity.",
				"Microsoft SQL Server":
					"Manages relational databases with enterprise query optimization and secure storage.",
				"Visual Studio Code":
					"Popular lightweight editor used for general scripting, web integration, and configuration.",
				"Visual Studio":
					"Primary IDE optimized for C# and C++ Unity game development, debugging, and native compiling.",
			},
		},
		// Socials
		socials: {
			socialProfiles: "SOCIAL PROFILES",
			projectLinks: "PROJECT LINKS",
			open: "OPEN",
			views: "VIEWS",
			contactMe: "Contact Me",
			name: "Name",
			email: "Email",
			message: "Message",
			send: "Send Message",
			sending: "Sending...",
			sentSuccess: "Message sent successfully!",
			stats: {
				all: "ALL",
				type: "TYPE",
				social: "SOCIAL",
				project: "PROJECT",
			},
			projects: {
				rocola:
					"A music player with a retro design, inspired by the classic jukebox aesthetic.",
				checkGithub: "Check My GitHub",
				checkGithubDesc:
					"For more game development projects and repositories, visit my GitHub profile.",
			},
			footer: {
				selectCategory: "SELECT CATEGORY OR ITEM",
				moveOrOpen: "MOVE TO RIGHT / OPEN SELECTED",
				back: "BACK",
			},
		},
		// Media Controls
		mediaControls: {
			musicOn: "MUSIC: ON",
			musicOff: "MUSIC: OFF",
			langEn: "LANG: EN",
			langEs: "LANG: ES",
		},
	},
	es: {
		// Menu
		p3Menu: {
			about: "SOBRE MÍ",
			resume: "CURRÍCULUM",
			socials: "REDES",
			mouseHint: "PUNTERO HOVER + CLIC",
			navigateHint: "NAVEGAR",
			confirmHint: "CONFIRMAR",
		},
		// About Me
		aboutMe: {
			title: "Sobre Mí",
			subtitle: "Dossier de Perfil",
			controls: "Controles de Teclado",
			openGithub: "Abrir GitHub",
			openSocialHub: "Abrir Redes",
			goBack: "Volver",
			tagline: "Elias Taveras, Desarrollador de Videojuegos Unity y Diseñador Junior",
			aboutText:
				"Actualmente estudio Programación en la Escuela Superior de Informática del Instituto Técnico Salesiano (ITESA). Me especializo en el desarrollo de videojuegos utilizando el motor Unity, C# y C++, creando mecánicas de juego, sistemas de UI en tiempo real y experiencias interactivas.",
			quickFactsTitle: "Datos Rápidos",
			quickFacts: [
				"Especializado en el desarrollo de videojuegos con el motor Unity utilizando C# para la lógica principal de juego y sistemas interactivos.",
				"Experiencia en programación de mecánicas de juego, diseño de interfaz (UI) en tiempo real y arquitectura de juegos (OOAD).",
				"Dominio de C++ para programación de sistemas, estructuras de datos y algoritmos de alto rendimiento.",
				"Apasionado por la física de juegos, el diseño del gameplay loop y la creación de videojuegos 2D/3D atractivos.",
			],
			linksTitle: "Enlaces",
			backToMenu: "Volver al Menú",
			back: "Atrás",
		},
		// Resume
		resume: {
			navTitle: "Currículum",
			skillsTitle: "Habilidades",
			skillsSubtitle: "Desarrollo de Videojuegos y Pila Técnica",
			projectsTitle: "Proyectos y Demos",
			projectsSubtitle: "Enlaces a Proyectos",
			detailsTitle: "Detalles",
			open: "ABRIR",
			openLink: "Abrir Enlace",
			helperProjects:
				"Selecciona una fila de proyecto y presiona Enter para abrir el enlace.",
			helperSkills:
				"La lista de habilidades destaca las herramientas y lenguajes principales de desarrollo de videojuegos.",
			skillMeta: {
				"Web Technologies": "Tecnologías Web",
				"Tools & Technologies": "Herramientas y Tecnologías",
				Databases: "Bases de Datos",
				"Game Development": "Desarrollo de Videojuegos",
				"Programming Language": "Lenguaje de Programación",
				"Dev Tools": "Herramientas de Desarrollo",
			},
			skillDetails: {
				Unity:
					"Desarrolla videojuegos 2D/3D, mecánicas de juego y sistemas de UI interactivos utilizando el motor Unity con C#.",
				"C#":
					"Escribe lógica de juego orientada a objetos, máquinas de estado y arquitectura de sistemas para Unity y .NET.",
				"C++":
					"Aplica programación de bajo nivel para sistemas de alto rendimiento, estructuras de datos y algoritmos de juegos.",
				React:
					"Construye portafolios e interfaces web interactivas con arquitectura basada en componentes.",
				JavaScript:
					"Utiliza características modernas de ES para aplicaciones web interactivas y scripting.",
				TypeScript:
					"Aplica interfaces y modelos con tipos seguros para mejorar el mantenimiento del código.",
				"CSS / Tailwind":
					"Crea sistemas de diseño visual estilizados y maquetación adaptativa.",
				HTML: "Crea estructuras de documentos semánticas para interfaces web.",
				"Git / GitHub":
					"Gestiona el control de versiones, flujo de ramas y repositorios de proyectos.",
				Linux:
					"Dominio de terminal, navegación del sistema y entornos de desarrollo en Linux.",
				PostgreSQL:
					"Diseña y gestiona bases de datos relacionales con consultas estructuradas e integridad de datos.",
				"Microsoft SQL Server":
					"Gestiona bases de datos relacionales con optimización de consultas y almacenamiento seguro.",
				"Visual Studio Code":
					"Editor ligero utilizado para scripting general, configuración e integración web.",
				"Visual Studio":
					"IDE principal optimizado para el desarrollo de videojuegos en Unity con C# y C++, depuración y compilación nativa.",
			},
		},
		// Socials
		socials: {
			socialProfiles: "PERFILES SOCIALES",
			projectLinks: "ENLACES A PROYECTOS",
			open: "ABRIR",
			views: "VISTAS",
			contactMe: "Contáctame",
			name: "Nombre",
			email: "Correo Electrónico",
			message: "Mensaje",
			send: "Enviar Mensaje",
			sending: "Enviando...",
			sentSuccess: "¡Mensaje enviado con éxito!",
			stats: {
				all: "TODOS",
				type: "TIPO",
				social: "SOCIAL",
				project: "PROYECTO",
			},
			projects: {
				rocola:
					"Un reproductor de música con diseño retro, inspirado en la estética clásica de la jukebox/vellonera.",
				checkGithub: "Visita Mi GitHub",
				checkGithubDesc:
					"Para ver más proyectos de desarrollo de videojuegos y repositorios, visita mi perfil de GitHub.",
			},
			footer: {
				selectCategory: "SELECCIONAR CATEGORÍA O ELEMENTO",
				moveOrOpen: "MOVER A DERECHA / ABRIR SELECCIONADO",
				back: "VOLVER",
			},
		},
		// Media Controls
		mediaControls: {
			musicOn: "MUSIC: ON",
			musicOff: "MUSIC: OFF",
			langEn: "LANG: EN",
			langEs: "LANG: ES",
		},
	},
};

export function LanguageProvider({ children }) {
	const [language, setLanguage] = useState(() => {
		return localStorage.getItem("p3_lang") || "en";
	});

	useEffect(() => {
		localStorage.setItem("p3_lang", language);
	}, [language]);

	const toggleLanguage = () => {
		setLanguage((prev) => (prev === "en" ? "es" : "en"));
	};

	const t = (path) => {
		const keys = path.split(".");
		let current = TRANSLATIONS[language];
		for (const key of keys) {
			if (current && current[key] !== undefined) {
				current = current[key];
			} else {
				return path;
			}
		}
		return current;
	};

	return (
		<LanguageContext.Provider value={{ language, toggleLanguage, t }}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (!context) {
		throw new Error("useLanguage must be used within a LanguageProvider");
	}
	return context;
}

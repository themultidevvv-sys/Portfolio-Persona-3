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
			tagline: "Elias Taveras, Game Designer Junior",
			aboutText:
				"Currently I'm studing Programming in the Higher School of Computer Science, Instituto Tecnico Salesiano (ITESA). I have some experience working in the game development and the windows form development.",
			quickFactsTitle: "Quick Facts",
			quickFacts: [
				"Currently I'm doing an internship at Entytec, that is a local Enterprise in my country .",
				"I'm learning about how to create modern website with API's KEY",
				"Know how to create apps with react",
				"Interested in realtime apps, tools, and graphics experiments",
			],
			linksTitle: "Links",
			backToMenu: "Back to Menu",
			back: "Back",
		},
		// Resume
		resume: {
			navTitle: "Resume",
			skillsTitle: "Skills",
			skillsSubtitle: "Technical And Creative Stack",
			projectsTitle: "Project In Vercel",
			projectsSubtitle: "Open Project Links",
			detailsTitle: "Details",
			open: "OPEN",
			openLink: "Open Link",
			helperProjects: "Select a project row and press Enter to open the link.",
			helperSkills: "Skills list comes from the original portfolio dataset.",
			skillMeta: {
				"Web Technologies": "Web Technologies",
				"Tools & Technologies": "Tools & Technologies",
				Databases: "Databases",
				"Game Development": "Game Development",
				"Programming Language": "Programming Language",
				"Dev Tools": "Dev Tools",
			},
			skillDetails: {
				React:
					"Builds responsive frontends with component architecture, reusable UI patterns, and state-driven interactions.",
				JavaScript:
					"Uses modern ES features for app logic, event handling, and browser-side architecture.",
				TypeScript:
					"Applies type-safe interfaces and models to improve maintainability and reduce runtime bugs.",
				"CSS / Tailwind":
					"Builds layered UI styling systems with utility-first speed and custom visual refinements.",
				HTML: "Creates semantic, accessible document structure with strong content hierarchy.",
				"Git / GitHub":
					"Manages version control, branching workflows, and collaboration-ready repositories.",
				Linux:
					"Comfortable with shell tooling, system navigation, and developer workflows in Linux environments.",
				PostgreSQL:
					"Designs and manages relational databases with structured queries, migrations, and data integrity.",
				Unity:
					"Develops interactive games and experiences using the Unity engine with C# scripting.",
				"C#":
					"Writes object-oriented applications and game logic with strong typing and .NET ecosystem tools.",
				"C++":
					"Applies low-level programming for performance-critical applications, game engines, and systems development.",
				"Microsoft SQL Server":
					"Manages relational databases with enterprise-level tools, query optimization, and secure data storage.",
				"Visual Studio Code":
					"A popular, lightweight code editor used for general web development, scripting, and customization.",
				"Visual Studio":
					"An IDE optimized for C# and C++ game design, Windows Forms engineering, and compiling native code.",
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
					"For more projects, visit my GitHub profile where I regularly update my repositories.",
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
			tagline: "Elias Taveras, Diseñador de Videojuegos Junior",
			aboutText:
				"Actualmente estoy estudiando Programación en la Escuela Superior de Informática del Instituto Técnico Salesiano (ITESA). Tengo experiencia trabajando en desarrollo de videojuegos y desarrollo con Windows Forms.",
			quickFactsTitle: "Datos Rápidos",
			quickFacts: [
				"Actualmente realizo una pasantía en Entytec, una empresa local de mi país.",
				"Estoy aprendiendo a crear sitios web modernos integrando claves de API.",
				"Sé cómo crear aplicaciones con React.",
				"Interesado en aplicaciones en tiempo real, herramientas y experimentos gráficos.",
			],
			linksTitle: "Enlaces",
			backToMenu: "Volver al Menú",
			back: "Atrás",
		},
		// Resume
		resume: {
			navTitle: "Currículum",
			skillsTitle: "Habilidades",
			skillsSubtitle: "Pila Técnica y Creativa",
			projectsTitle: "Proyectos en Vercel",
			projectsSubtitle: "Enlaces a Proyectos",
			detailsTitle: "Detalles",
			open: "ABRIR",
			openLink: "Abrir Enlace",
			helperProjects:
				"Selecciona una fila de proyecto y presiona Enter para abrir el enlace.",
			helperSkills:
				"La lista de habilidades proviene del conjunto de datos original del portafolio.",
			skillMeta: {
				"Web Technologies": "Tecnologías Web",
				"Tools & Technologies": "Herramientas y Tecnologías",
				Databases: "Bases de Datos",
				"Game Development": "Desarrollo de Videojuegos",
				"Programming Language": "Lenguaje de Programación",
				"Dev Tools": "Herramientas de Desarrollo",
			},
			skillDetails: {
				React:
					"Construye frontends adaptativos con arquitectura de componentes, patrones de UI reutilizables e interacciones basadas en estado.",
				JavaScript:
					"Utiliza características modernas de ES para la lógica de la aplicación, manejo de eventos y arquitectura en el navegador.",
				TypeScript:
					"Aplica interfaces y modelos con tipos seguros para mejorar el mantenimiento y reducir errores en tiempo de ejecución.",
				"CSS / Tailwind":
					"Crea sistemas de diseño visual por capas con velocidad basada en utilidades y acabados visuales personalizados.",
				HTML: "Crea estructuras de documentos semánticas y accesibles con una sólida jerarquía de contenido.",
				"Git / GitHub":
					"Gestiona el control de versiones, flujos de ramificación y repositorios listos para la colaboración.",
				Linux:
					"Dominio de herramientas de terminal, navegación por el sistema y flujos de trabajo en entornos Linux.",
				PostgreSQL:
					"Diseña y gestiona bases de datos relacionales con consultas estructuradas, migraciones e integridad de datos.",
				Unity:
					"Desarrolla videojuegos y experiencias interactivas utilizando el motor Unity y programación en C#.",
				"C#":
					"Escribe aplicaciones orientadas a objetos y lógica de juegos con tipado fuerte y herramientas del ecosistema .NET.",
				"C++":
					"Aplica programación de bajo nivel para aplicaciones de alto rendimiento, motores de juego y desarrollo de sistemas.",
				"Microsoft SQL Server":
					"Gestiona bases de datos relacionales con herramientas empresariales, optimización de consultas y almacenamiento seguro.",
				"Visual Studio Code":
					"Un editor de código ligero y popular utilizado para desarrollo web general, scripting y personalización.",
				"Visual Studio":
					"Un IDE optimizado para el diseño de juegos en C# y C++, ingeniería con Windows Forms y compilación de código nativo.",
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
					"Para ver más proyectos, visita mi perfil de GitHub donde actualizo frecuentemente mis repositorios.",
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

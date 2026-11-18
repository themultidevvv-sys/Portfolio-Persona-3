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
			tagline: "Elias Taveras, Junior Backend & Web Developer | C# / .NET",
			aboutText:
				"I am a junior developer focused on backend and web development. I design the logic behind systems: business rules, data, transactions, user roles and activity history, with C# and .NET as my main stack and Node.js, React and relational databases (SQL Server, PostgreSQL, MySQL) as supporting tools. I also work on ethical hacking fundamentals, from network scanning to man-in-the-middle attacks, and I keep game development as a strong strength: since 2022 I have built Unity prototypes in C# with combat, dodging and isometric gameplay that help me think in systems, states and rules.",
			quickFactsTitle: "Quick Facts",
			quickFacts: [
				"Backend and web focus: C# / .NET business logic, CRUD operations, role-based access and transaction history.",
				"Web stack: Node.js, React, JavaScript, HTML/CSS, Tailwind CSS and relational databases such as SQL Server, PostgreSQL and MySQL.",
				"Ethical hacking basics: network scanning, man-in-the-middle attacks and CTF practice under the alias RymonElaies.",
				"Strong game development background: Unity and C# prototypes with isometric views, combat systems and dodge mechanics since 2022.",
			],
			focusTitle: "Focus Areas",
			focus: [
				{
					title: "Web & Backend",
					text: "System logic, APIs, relational data and role-based access.",
				},
				{
					title: "Cybersecurity",
					text: "Ethical hacking fundamentals and CTF practice.",
				},
				{
					title: "Game Development",
					text: "Unity + C# systems, combat and dodge mechanics.",
				},
			],
			linksTitle: "Links",
			backToMenu: "Back to Menu",
			back: "Back",
		},
		// Resume
		resume: {
			navTitle: "Resume",
			skillsTitle: "Skills",
			skillsSubtitle: "Web, Backend & Technical Stack",
			projectsTitle: "Projects & Demos",
			projectsSubtitle: "Open Project Links",
			collabsTitle: "Collabs/Co-Development",
			collabsSubtitle: "Project that i worked in or participated",
			recordsTitle: "Events / Records",
			recordsSubtitle: "Public participations in chronological order",
			statsTitle: "Statistics / Stats",
			statsSubtitle: "Programming skills ranked from 1 to 10",
			recordsMeta: "Public participation",
			detailsTitle: "Details",
			open: "OPEN",
			openLink: "Open Link",
			helperProjects: "Select a project row and press Enter to open the link.",
			helperSkills: "Skills list highlights web, backend and game development tools.",
			helperRecords: "Select a record and press Enter to open its link.",
			helperStats: "Use Left / Right to inspect each skill bar.",
			skillMeta: {
				"Web Technologies": "Web Technologies",
				"Tools & Technologies": "Tools & Technologies",
				Databases: "Databases",
				"Game Development": "Game Development",
				"Programming Language": "Programming Language",
				"Dev Tools": "Dev Tools",
				"Backend Framework": "Backend Framework",
				Runtime: "Runtime",
			},
			skillDetails: {
				Unity:
					"Develops 2D/3D interactive games, gameplay mechanics, and UI systems using the Unity engine with C# scripting.",
				"C#":
					"Writes object-oriented gameplay logic, state machines, and system architecture for Unity games and .NET applications.",
				"C++":
					"Applies low-level programming for performance-critical systems, custom data structures, and game algorithms.",
				".NET":
					"Builds backend services and business logic with C# and .NET, including transactions, user roles and data access.",
				"Node.js":
					"Uses Node.js for server-side scripting, APIs and web tooling alongside front-end technologies.",
				MySQL:
					"Designs relational schemas and writes SQL queries for structured, consistent data storage.",
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
			collabsDetails: {
				thisisnteven:
					"This Isn't Even My Final Form is a small idle clicker about collecting video game consoles, accessories, peripherals, and other bits of gaming hardware. Start with a simple collection and gradually build it into increasingly ridiculous rigs. Collect hardware, generate resources, unlock new parts, and keep adding more things until it reaches its final form, or not.",
			},
			recordsDetails: {
				ctfMagic:
					"Participation in a Capture The Flag event on the CTF Magic platform under the username RymonElaies, applying ethical hacking fundamentals such as network scanning and man-in-the-middle analysis.",
			},
			statsNames: {
				videoGames: "Video Games",
				web: "Web Development",
				cybersecurity: "Cybersecurity",
			},
			statsRanks: {
				1: "Novice",
				2: "Basic",
				3: "Apprentice",
				4: "Intermediate",
				5: "Proficient",
				6: "Advanced",
				7: "Expert",
				8: "Master",
				9: "Veteran",
				10: "Legendary",
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
			tagline: "Elias Taveras, Desarrollador Junior Backend y Web | C# / .NET",
			aboutText:
				"Soy un desarrollador junior enfocado en el backend y el desarrollo web. Diseño la lógica que sostiene a los sistemas: reglas de negocio, datos, transacciones, roles de usuario e historial de movimientos, con C# y .NET como stack principal y Node.js, React y bases de datos relacionales (SQL Server, PostgreSQL y MySQL) como herramientas de apoyo. También trabajo en conceptos básicos de hacking ético, desde el escaneo de redes hasta los ataques man-in-the-middle, y mantengo el desarrollo de videojuegos como una fortaleza: desde 2022 he creado prototipos en Unity con C# con combate, esquive y vista isométrica que me ayudan a pensar en sistemas, estados y reglas.",
			quickFactsTitle: "Datos Rápidos",
			quickFacts: [
				"Enfoque backend y web: lógica de negocio en C# / .NET, operaciones CRUD, control de acceso por roles e historial de transacciones.",
				"Stack web: Node.js, React, JavaScript, HTML/CSS, Tailwind CSS y bases de datos relacionales como SQL Server, PostgreSQL y MySQL.",
				"Bases de hacking ético: escaneo de redes, ataques man-in-the-middle y práctica en CTF con el alias RymonElaies.",
				"Sólida experiencia en videojuegos: prototipos en Unity con C#, vista isométrica, combate y mecánicas de esquive desde 2022.",
			],
			focusTitle: "Áreas de Enfoque",
			focus: [
				{
					title: "Web y Backend",
					text: "Lógica de sistemas, APIs, datos relacionales y acceso por roles.",
				},
				{
					title: "Ciberseguridad",
					text: "Bases de hacking ético y práctica en CTF.",
				},
				{
					title: "Videojuegos",
					text: "Sistemas en Unity + C#, combate y mecánicas de esquive.",
				},
			],
			linksTitle: "Enlaces",
			backToMenu: "Volver al Menú",
			back: "Atrás",
		},
		// Resume
		resume: {
			navTitle: "Currículum",
			skillsTitle: "Habilidades",
			skillsSubtitle: "Web, Backend y Pila Técnica",
			projectsTitle: "Proyectos y Demos",
			projectsSubtitle: "Enlaces a Proyectos",
			collabsTitle: "Colaboraciones/Co-Desarrollo",
			collabsSubtitle: "Proyectos en los que he colaborado o participado",
			recordsTitle: "Eventos / Records",
			recordsSubtitle: "Participaciones públicas en orden cronológico",
			statsTitle: "Estadísticas / Stats",
			statsSubtitle: "Habilidades de programación del 1 al 10",
			recordsMeta: "Participación pública",
			detailsTitle: "Detalles",
			open: "ABRIR",
			openLink: "Abrir Enlace",
			helperProjects:
				"Selecciona una fila de proyecto y presiona Enter para abrir el enlace.",
			helperSkills:
				"La lista de habilidades destaca herramientas de web, backend y desarrollo de videojuegos.",
			helperRecords:
				"Selecciona un record y presiona Enter para abrir su enlace.",
			helperStats: "Usa Izquierda / Derecha para revisar cada barra de habilidad.",
			skillMeta: {
				"Web Technologies": "Tecnologías Web",
				"Tools & Technologies": "Herramientas y Tecnologías",
				Databases: "Bases de Datos",
				"Game Development": "Desarrollo de Videojuegos",
				"Programming Language": "Lenguaje de Programación",
				"Dev Tools": "Herramientas de Desarrollo",
				"Backend Framework": "Framework Backend",
				Runtime: "Entorno de Ejecución",
			},
			skillDetails: {
				Unity:
					"Desarrolla videojuegos 2D/3D, mecánicas de juego y sistemas de UI interactivos utilizando el motor Unity con C#.",
				"C#":
					"Escribe lógica de juego orientada a objetos, máquinas de estado y arquitectura de sistemas para Unity y .NET.",
				"C++":
					"Aplica programación de bajo nivel para sistemas de alto rendimiento, estructuras de datos y algoritmos de juegos.",
				".NET":
					"Construye servicios backend y lógica de negocio con C# y .NET, incluyendo transacciones, roles de usuario y acceso a datos.",
				"Node.js":
					"Utiliza Node.js para scripting del lado del servidor, APIs y herramientas web junto a tecnologías front-end.",
				MySQL:
					"Diseña esquemas relacionales y escribe consultas SQL para almacenar datos de forma estructurada y consistente.",
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
			collabsDetails: {
				thisisnteven:
					"This Isn't Even My Final Form es un pequeño juego idle clicker sobre coleccionar consolas de videojuegos, accesorios, periféricos y otros componentes de hardware gaming. Comienza con una colección simple y constrúyela gradualmente en configuraciones cada vez más disparatadas. Colecciona hardware, genera recursos, desbloquea nuevas partes y sigue añadiendo más cosas hasta alcanzar su forma final... o no.",
			},
			recordsDetails: {
				ctfMagic:
					"Participación en un evento Capture The Flag en la plataforma CTF Magic con el usuario RymonElaies, aplicando conceptos básicos de hacking ético como escaneo de redes y análisis man-in-the-middle.",
			},
			statsNames: {
				videoGames: "Videojuegos",
				web: "Web",
				cybersecurity: "Ciberseguridad",
			},
			statsRanks: {
				1: "Novato",
				2: "Básico",
				3: "Aprendiz",
				4: "Intermedio",
				5: "Competente",
				6: "Avanzado",
				7: "Experto",
				8: "Maestro",
				9: "Veterano",
				10: "Legendario",
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

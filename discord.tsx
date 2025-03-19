import { useState, useEffect, useRef, MouseEvent } from "react";
import { useRouter } from "next/router";

export default function DiscordPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Estado para rota atual (destaca item no menu)
  const [currentRoute, setCurrentRoute] = useState("discord");
  const router = useRouter();

  // Exemplo de logout
  function handleLogout() {
    setIsLoggedIn(false);
  }

  // Fechar menu de perfil se clicar fora
  function handleClickOutside(e: MouseEvent) {
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(e.target as Node)
    ) {
      setProfileMenuOpen(false);
    }
  }

  // useEffect se quiser
  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside as any);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside as any);
  //   };
  // }, []);

  function goToRoute(routeName: string, path: string) {
    setCurrentRoute(routeName);
    router.push(path);
  }

  return (
    <div className="bg-[#121212] min-h-screen text-white flex">
      {/* Barra Lateral */}
      <aside className="hidden sm:flex flex-col w-60 bg-[#1a1a1a] p-4">
        <div className="flex items-center mb-8">
          <img
            src="/images/logotipo.png"
            alt="LearnConnect Logo"
            className="w-8 h-8 mr-2"
          />
          <span className="text-xl font-bold text-[#5c64f4]">LearnConnect</span>
        </div>

        {/* Menu */}
        <nav className="flex flex-col gap-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToRoute("home", "/");
            }}
            className={`flex items-center gap-2 transition ${
              currentRoute === "home" ? "text-[#5c64f4]" : "hover:text-[#5c64f4]"
            }`}
          >
            <img src="/images/home.png" alt="Home" className="w-5 h-5" />
            <span>Home</span>
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToRoute("popular", "/popular");
            }}
            className={`flex items-center gap-2 transition ${
              currentRoute === "popular" ? "text-[#5c64f4]" : "hover:text-[#5c64f4]"
            }`}
          >
            <img src="/images/popular.png" alt="Popular" className="w-5 h-5" />
            <span>Popular</span>
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToRoute("explore", "/explore");
            }}
            className={`flex items-center gap-2 transition ${
              currentRoute === "explore" ? "text-[#5c64f4]" : "hover:text-[#5c64f4]"
            }`}
          >
            <img src="/images/explore.png" alt="Explore" className="w-5 h-5" />
            <span>Explore</span>
          </a>
          {/* Aqui mudamos "communities" para "discord" */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToRoute("discord", "/discord");
            }}
            className={`flex items-center gap-2 transition ${
              currentRoute === "discord"
                ? "text-[#5c64f4]"
                : "hover:text-[#5c64f4]"
            }`}
          >
            <img src="/images/comunidades.png" alt="Discord" className="w-5 h-5" />
            <span>Discord</span>
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToRoute("topics", "/topics");
            }}
            className={`flex items-center gap-2 transition ${
              currentRoute === "topics" ? "text-[#5c64f4]" : "hover:text-[#5c64f4]"
            }`}
          >
            <img src="/images/topicos.png" alt="Tópicos" className="w-5 h-5" />
            <span>Tópicos</span>
          </a>
        </nav>
      </aside>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col">
        {/* Barra Superior */}
        <header className="flex items-center justify-between bg-[#1a1a1a] p-3 sm:p-4">
          <div className="flex-1 mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-full bg-[#121212] text-white px-4 py-2 pl-10 focus:outline-none"
              />
              <img
                src="/images/search.png"
                alt="Search Icon"
                className="absolute w-5 h-5 top-2.5 left-3"
              />
            </div>
          </div>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-1 bg-[#1a1a1a] border border-[#5c64f4] rounded-full px-4 py-2 hover:bg-[#2a2a2a]"
                onClick={() => router.push("/create")}
              >
                <img src="/images/criar.png" alt="Criar" className="w-5 h-5" />
                <span>Criar</span>
              </button>

              <button className="relative">
                <img
                  src="/images/notificacoes.png"
                  alt="Notificações"
                  className="w-6 h-6"
                />
              </button>

              <div className="relative" ref={profileMenuRef}>
                <img
                  src="/images/perfil.png"
                  alt="Perfil"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                />
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-[0_0_10px_#5c64f4] transition-all duration-300">
                    <ul className="py-2 text-sm">
                      {/* ... itens do menu ... */}
                      <li
                        className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer text-red-400"
                        onClick={handleLogout}
                      >
                        Sair
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button
              className="bg-[#5c64f4] text-white px-4 py-2 rounded-full hover:opacity-90"
              onClick={() => console.log("Login")}
            >
              Entrar
            </button>
          )}
        </header>

        {/* Conteúdo da Tela Discord */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6" style={{ scrollBehavior: "smooth" }}>
          {/* Banner no topo */}
          <div
            className="relative w-full h-40 sm:h-60 md:h-72 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/servidorbanner.png')" }}
          ></div>

          {/* Ícone do servidor sobreposto */}
          <div className="relative -mt-10 flex justify-center">
            <img
              src="/images/servidordc.png"
              alt="Ícone do Servidor"
              className="w-24 h-24 rounded-full border-4 border-[#121212] object-cover"
            />
          </div>

          {/* Informações do servidor */}
          <section className="text-center mt-4">
            {/* Nome do servidor */}
            <h1 className="text-2xl font-bold flex justify-center items-center gap-2">
              Old Duque's
              <img
                src="/images/dccomunidadeicon.png"
                alt="Ícone Comunidade"
                className="w-5 h-5"
              />
            </h1>
            {/* Estatísticas: ex. 207 Membros, 55 Online */}
            <p className="text-gray-400 text-sm mt-1">
              <span>207 Membros</span> • <span className="text-green-400">55 Online</span>
              {/* Se quiser exibir offline: <span className="text-gray-400">152 offline</span> */}
            </p>
            <p className="mt-1 text-sm text-gray-400">Est. Ago 2020</p>

            {/* Descrição */}
            <p className="text-sm text-gray-300 mt-3 w-full sm:w-3/4 md:w-1/2 mx-auto">
              Um lugar dedicado... Nosso próprio servidor no Discord. <br />
              Encontre colegas de aprendizado e caminhada, ou ensine os outros!<br />
              Networking é nosso sobrenome aqui. Com requinte, você é bem vindo(a)!
            </p>

            {/* Botão "Ir para o servidor" */}
            <div className="mt-4">
              <a
                href="https://discord.gg/wDMfTdkF79"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#5c64f4] text-white px-6 py-2 text-lg font-semibold rounded-full
                           transition hover:bg-white hover:text-[#5c64f4]
                           hover:shadow-[0_0_10px_#5c64f4]"
              >
                Ir para o servidor
              </a>
            </div>
          </section>

          {/* Caso queira adicionar mais conteúdo no futuro, rolagem suportada */}
        </main>

      </div>
    </div>
  );
}

import { useState, useRef, MouseEvent } from "react";
import { useRouter } from "next/router";

export default function CreatePost() {
  // ---------------------------
  // 1) Estados e Funções de Login (simulados), iguais ao NewHome
  // ---------------------------
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Menu lateral: controlamos a rota atual para destacar
  // Por exemplo, "create" ou "/", "/popular" etc.
  const [currentRoute, setCurrentRoute] = useState("create");

  function handleLogin() {
    if (!isLoggedIn) setIsLoggedIn(true);
  }
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

  // ---------------------------
  // 2) Estado para as abas e campos do formulário
  // ---------------------------
  type TabType = "text" | "images" | "link" | "poll";
  const [activeTab, setActiveTab] = useState<TabType>("text");

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Em vez de array, agora guardamos apenas UMA tag obrigatória
  const [postTag, setPostTag] = useState<string>(""); // se vazio, não tem tag
  // Controla se o "pop-up" de seleção de tags está aberto
  const [tagSelectorOpen, setTagSelectorOpen] = useState(false);
  const [tagSearch, setTagSearch] = useState("");

  // Exemplo de manipulação de imagens (mock)
  const [images, setImages] = useState<File[]>([]);

  function handleSaveDraft() {
    if (!postTag) {
      alert("É obrigatório escolher 1 tag antes de salvar como rascunho!");
      return;
    }
    alert("Rascunho salvo (mock). Título: " + title);
  }

  function handlePost() {
    if (!postTag) {
      alert("É obrigatório escolher 1 tag antes de postar!");
      return;
    }
    alert("Post enviado (mock). Título: " + title + " | Tag: " + postTag);
  }

  // ---------------------------
  // 3) Lógica de seleção de Tag
  // ---------------------------
  const popularTags = ["Programação", "Design", "Segurança"];
  function selectTag(tag: string) {
    setPostTag(tag);
    setTagSelectorOpen(false);
  }

  // ---------------------------
  // 4) Função de Navegação
  // ---------------------------
  function goToRoute(routeName: string, path: string) {
    // Destaca no menu
    setCurrentRoute(routeName);
    // Navega
    router.push(path);
  }

  // ---------------------------
  // 5) Layout
  // ---------------------------
  return (
    <div className="bg-[#121212] min-h-screen text-white flex">
      {/* Barra de Navegação Lateral (igual NewHome) */}
      <aside className="hidden sm:flex flex-col w-60 bg-[#1a1a1a] p-4">
        <div className="flex items-center mb-8">
          <img src="/images/logotipo.png" alt="LearnConnect Logo" className="w-8 h-8 mr-2" />
          <span className="text-xl font-bold text-[#5c64f4]">LearnConnect</span>
        </div>
        <nav className="flex flex-col gap-4">
          {/* Exemplo: Home -> "/" */}
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

          {/* Popular -> "/popular" (exemplo) */}
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

          {/* Explore -> "/explore" */}
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

          {/* Communities -> "/communities" */}
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

          {/* Topics -> "/topics" */}
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
            <span>Topics</span>
          </a>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col p-4">
        {/* Barra Superior (igual NewHome) */}
        <header className="flex items-center justify-between bg-[#1a1a1a] p-3 sm:p-4 mb-6">
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

          {!isLoggedIn ? (
            <button
              className="bg-[#5c64f4] text-white px-4 py-2 rounded-full hover:opacity-90"
              onClick={handleLogin}
            >
              Entrar
            </button>
          ) : (
            <div className="flex items-center gap-4">
              {/* Botão Criar: aqui podemos deixar inativo, pois já estamos em create */}
              <button className="flex items-center gap-1 bg-[#2a2a2a] border border-[#5c64f4] rounded-full px-4 py-2 cursor-not-allowed opacity-50">
                <img src="/images/criar.png" alt="Criar" className="w-5 h-5" />
                <span>Criar</span>
              </button>

              <button className="relative">
                <img src="/images/notificacoes.png" alt="Notificações" className="w-6 h-6" />
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
                      <li className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer flex items-center gap-2">
                        <img src="/images/editavatar.png" alt="Edit Avatar" className="w-4 h-4" />
                        Edit Avatar
                      </li>
                      <li className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer flex items-center gap-2">
                        <img src="/images/conquistas.png" alt="Conquistas" className="w-4 h-4" />
                        Achievements
                      </li>
                      <li className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer flex items-center gap-2">
                        <img src="/images/contribuicao.png" alt="Contribuição" className="w-4 h-4" />
                        Contributor Program
                      </li>
                      <li className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer flex items-center gap-2">
                        <img src="/images/darkmode.png" alt="Dark Mode" className="w-4 h-4" />
                        Dark Mode
                      </li>
                      <li className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer flex items-center gap-2" onClick={() => router.push("/settings")}>
                        <img src="/images/Config.png" alt="Configurações" className="w-4 h-4" />
                        Settings
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer flex items-center gap-2 text-red-400"
                        onClick={handleLogout}
                      >
                        <img src="/images/logoff.png" alt="Log Out" className="w-4 h-4" />
                        Log Out
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </header>

        {/* Conteúdo da tela "Create post" */}
        <div className="max-w-3xl mx-auto flex-1 flex flex-col">
          {/* Título e Drafts */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Create post</h1>
            <div className="text-gray-400 cursor-pointer hover:text-white">
              Drafts
            </div>
          </div>

          {/* Abas */}
          <nav className="flex gap-6 mb-6 border-b border-gray-700">
            <button
              className={`pb-2 ${
                activeTab === "text"
                  ? "text-white border-b-2 border-[#5c64f4]"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("text")}
            >
              Text
            </button>
            <button
              className={`pb-2 ${
                activeTab === "images"
                  ? "text-white border-b-2 border-[#5c64f4]"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("images")}
            >
              Images & Video
            </button>
            <button
              className={`pb-2 ${
                activeTab === "link"
                  ? "text-white border-b-2 border-[#5c64f4]"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("link")}
            >
              Link
            </button>
            <button
              className={`pb-2 ${
                activeTab === "poll"
                  ? "text-white border-b-2 border-[#5c64f4]"
                  : "text-gray-400"
              }`}
              onClick={() => setActiveTab("poll")}
            >
              Poll
            </button>
          </nav>

          {/* Formulário */}
          {/* Título */}
          <div className="mb-4">
            <label className="block text-sm text-gray-300 mb-1">
              Title<span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className="w-full bg-[#1a1a1a] border border-gray-700 p-2 rounded focus:outline-none text-white"
              placeholder="Title"
              maxLength={300}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="text-right text-gray-400 text-xs">
              {title.length}/300
            </div>
          </div>

          {/* Selecionar Tag (obrigatória) */}
          <div className="mb-4 relative">
            <button
              className="bg-[#2a2a2a] hover:bg-[#333] text-sm py-1 px-3 rounded"
              onClick={() => setTagSelectorOpen(!tagSelectorOpen)}
            >
              {postTag ? `Tag: ${postTag}` : "Add tag"}
            </button>
            {tagSelectorOpen && (
              <div className="absolute top-12 left-0 w-64 bg-[#1a1a1a] border border-gray-600 p-4 rounded shadow-lg z-10">
                <label className="block text-sm text-gray-300 mb-1">
                  Search tag:
                </label>
                <input
                  type="text"
                  className="w-full bg-[#121212] p-2 rounded focus:outline-none text-white mb-2"
                  placeholder="Search"
                  value={tagSearch}
                  onChange={(e) => setTagSearch(e.target.value)}
                />
                <p className="text-sm text-gray-400 mb-1">Mais usadas:</p>
                <div className="flex flex-col gap-1">
                  {popularTags.map((tg) => (
                    <button
                      key={tg}
                      className="bg-[#2a2a2a] hover:bg-[#333] text-left text-sm px-3 py-1 rounded"
                      onClick={() => selectTag(tg)}
                    >
                      {tg}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {activeTab === "text" && (
            <div className="mb-4">
              <label className="block text-sm text-gray-300 mb-1">Body</label>
              <textarea
                className="w-full bg-[#1a1a1a] border border-gray-700 p-2 rounded focus:outline-none text-white h-32"
                placeholder="Write your text..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <div className="text-right text-sm text-gray-400 mt-1">
                Switch to Markdown Editor
              </div>
            </div>
          )}

          {activeTab === "images" && (
            <div className="mb-4 border border-dashed border-gray-500 p-6 rounded text-center">
              <p className="text-gray-500 mb-2">Drag and Drop or upload media</p>
              <input
                type="file"
                multiple
                className="hidden"
                // ...
              />
            </div>
          )}

          {activeTab === "link" && (
            <div className="mb-4">
              <label className="block text-sm text-gray-300 mb-1">
                Link URL
              </label>
              <input
                type="text"
                className="w-full bg-[#1a1a1a] border border-gray-700 p-2 rounded focus:outline-none text-white"
                placeholder="https://..."
              />
            </div>
          )}

          {activeTab === "poll" && (
            <div className="mb-4">
              <p className="text-gray-300 mb-2">Poll creation (mock)</p>
            </div>
          )}

          {/* Botões de Salvar Rascunho e Postar */}
          <div className="mt-6 flex gap-2">
            <button
              className="bg-[#2a2a2a] text-white px-4 py-2 rounded hover:bg-[#333]"
              onClick={handleSaveDraft}
            >
              Save Draft
            </button>
            <button
              className="bg-[#5c64f4] text-white px-4 py-2 rounded hover:opacity-90"
              onClick={handlePost}
            >
              Post
            </button>
          </div>

          {/* Rodapé */}
          <footer className="mt-auto text-center text-gray-500 text-xs pt-8 border-t border-gray-800">
            Regras LearnConnect | Política de Privacidade | Contrato de Usuário |
            LearnConnect, INC 2025, Todos os direitos reservados
          </footer>
        </div>
      </div>
    </div>
  );
}

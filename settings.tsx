import { useState, useRef, MouseEvent } from "react";
import { useRouter } from "next/router";

export default function SettingsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Exemplo: assumimos logado
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Controle de qual “aba” interna (Conta ou Perfil)
  type TabType = "account" | "profile";
  const [activeTab, setActiveTab] = useState<TabType>("account");

  // Estado para rota atual no menu lateral
  const [currentRoute, setCurrentRoute] = useState("settings");
  const router = useRouter();

  // Funções de login/logout simuladas
  function handleLogout() {
    setIsLoggedIn(false);
  }
  function handleClickOutside(e: MouseEvent) {
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(e.target as Node)
    ) {
      setProfileMenuOpen(false);
    }
  }

  // Lógica de navegação no menu lateral (opcional)
  function goToRoute(routeName: string, path: string) {
    setCurrentRoute(routeName);
    router.push(path);
  }

  // -------------------------------------------------
  // ABA DE CONTA (mesmo que antes, sem alteração)
  // -------------------------------------------------
  function AccountTab() {
    return (
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        <div className="mt-4">
          {/* Sessão "Geral" */}
          <div className="border-b border-gray-700 pb-2 mb-4 text-gray-300 text-sm">
            Geral
          </div>
          <div className="mb-6 ml-4 text-sm text-gray-400">
            <p className="mb-2">
              <strong>Endereço de e-mail</strong>: caio.duque2004@gmail.com{" "}
              <button className="text-[#5c64f4] ml-2">{" >"}</button>
            </p>
            <p>
              <strong>Gênero</strong>:{" "}
              <button className="text-[#5c64f4] ml-2">{" >"}</button>
            </p>
          </div>

          {/* Sessão "Autorização de Conta" */}
          <div className="border-b border-gray-700 pb-2 mb-4 text-gray-300 text-sm">
            Autorização de Conta
          </div>
          <div className="ml-4 text-sm text-gray-400 mb-6">
            <p className="mb-2">
              <strong>Google</strong>: Conecte sua conta Google e facilite a
              postagem de materiais com o Google Drive!
            </p>
            <button className="bg-[#2a2a2a] px-3 py-1 rounded mr-4">
              Desconectar
            </button>
            <button className="bg-[#5c64f4] px-3 py-1 rounded text-white hover:shadow-[0_0_10px_#5c64f4] transition">
              Conectar
            </button>

            <p className="mb-2 mt-4">
              <strong>Discord</strong>: Conecte sua conta Discord e obtenha
              badges incríveis (iguais aos seus cargos no servidor)!
            </p>
            <button className="bg-[#2a2a2a] px-3 py-1 rounded mr-4">
              Desconectar
            </button>
            <button className="bg-[#5c64f4] px-3 py-1 rounded text-white hover:shadow-[0_0_10px_#5c64f4] transition">
              Conectar
            </button>

            <p className="mt-4">
              <strong>Autenticação de Dois Fatores</strong>:{" "}
              <span className="text-[#5c64f4] cursor-pointer hover:underline">
                Perdeu acesso ao seu app de autenticação? Acesse seus códigos de
                backup
              </span>
            </p>
          </div>

          {/* Sessão "Assinaturas" */}
          <div className="border-b border-gray-700 pb-2 mb-4 text-gray-300 text-sm">
            Assinaturas
          </div>
          <div className="ml-4 text-sm text-[#5c64f4] mb-6 cursor-pointer hover:underline">
            Obter Premium
          </div>

          {/* Sessão "Avançado" */}
          <div className="border-b border-gray-700 pb-2 mb-4 text-gray-300 text-sm">
            Avançado
          </div>
          <div className="ml-4 text-sm text-[#5c64f4] cursor-pointer hover:underline">
            Excluir conta
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------
  // ABA DE PERFIL (ADICIONANDO OS MODAIS)
  // -------------------------------------------------
  function ProfileTab() {
    // 1) Estados para abrir/fechar modais
    const [showDisplayNameModal, setShowDisplayNameModal] = useState(false);
    const [showDescriptionModal, setShowDescriptionModal] = useState(false);
    const [showAvatarModal, setShowAvatarModal] = useState(false);
    const [showBannerModal, setShowBannerModal] = useState(false);
    const [showSocialLinksModal, setShowSocialLinksModal] = useState(false);

    // 2) Conteúdo principal da aba
    return (
      <div className="mt-6 relative">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>

        <div className="mt-4">
          {/* Sessão "Geral" */}
          <div className="border-b border-gray-700 pb-2 mb-4 text-gray-300 text-sm">
            Geral
          </div>
          <div className="ml-4 text-sm text-gray-400 mb-6">
            <p className="mb-2">
              <strong>Nome de exibição</strong> (Alterar seu nome de exibição
              não muda seu nome de usuário)
              <button
                className="text-[#5c64f4] ml-2 hover:underline"
                onClick={() => setShowDisplayNameModal(true)}
              >
                {">"}
              </button>
            </p>
            <p className="mb-2">
              <strong>Descrição</strong>
              <button
                className="text-[#5c64f4] ml-2 hover:underline"
                onClick={() => setShowDescriptionModal(true)}
              >
                {">"}
              </button>
            </p>
            <p className="mb-2">
              <strong>Avatar</strong> (Edite seu avatar ou faça upload)
              <button
                className="text-[#5c64f4] ml-2 hover:underline"
                onClick={() => setShowAvatarModal(true)}
              >
                {">"}
              </button>
            </p>
            <p className="mb-2">
              <strong>Banner</strong> (Envie uma imagem para o fundo de perfil)
              <button
                className="text-[#5c64f4] ml-2 hover:underline"
                onClick={() => setShowBannerModal(true)}
              >
                {">"}
              </button>
            </p>
            <p>
              <strong>Links Sociais</strong>
              <button
                className="text-[#5c64f4] ml-2 hover:underline"
                onClick={() => setShowSocialLinksModal(true)}
              >
                {">"}
              </button>
            </p>
          </div>
        </div>

        {/* 3) Aqui vêm os modais (DisplayName, Description, Avatar, Banner, SocialLinks) */}
        {showDisplayNameModal && <DisplayNameModal onClose={() => setShowDisplayNameModal(false)} />}
        {showDescriptionModal && <DescriptionModal onClose={() => setShowDescriptionModal(false)} />}
        {showAvatarModal && <AvatarModal onClose={() => setShowAvatarModal(false)} />}
        {showBannerModal && <BannerModal onClose={() => setShowBannerModal(false)} />}
        {showSocialLinksModal && <SocialLinksModal onClose={() => setShowSocialLinksModal(false)} />}
      </div>
    );
  }

  // -------------------------------------------------
  // 4) MODAIS DE EDIÇÃO
  // -------------------------------------------------
  // A) Nome de exibição
  function DisplayNameModal({ onClose }: { onClose: () => void }) {
    const [displayName, setDisplayName] = useState("");

    function handleSave() {
      alert(`Nome de exibição atualizado para: ${displayName}`);
      onClose();
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-[#1a1a1a] w-80 max-w-full p-6 rounded-md relative shadow-[0_0_15px_#5c64f4]">
          <button
            className="absolute top-2 right-2 text-gray-300 hover:text-white"
            onClick={onClose}
          >
            ✕
          </button>
          <h3 className="text-xl font-bold mb-4">Nome de exibição</h3>
          <p className="text-sm text-gray-400 mb-2">
            Alterar seu nome de exibição não muda seu nome de usuário
          </p>
          <input
            type="text"
            maxLength={90}
            className="w-full bg-[#121212] text-white p-2 rounded mb-4"
            placeholder="Digite o novo nome de exibição..."
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={onClose}
              className="bg-gray-600 px-4 py-2 rounded hover:opacity-80"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="bg-[#5c64f4] text-white px-4 py-2 rounded hover:shadow-[0_0_10px_#5c64f4] transition"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // B) Descrição
  function DescriptionModal({ onClose }: { onClose: () => void }) {
    const [description, setDescription] = useState("");

    function handleSave() {
      alert(`Nova descrição: ${description}`);
      onClose();
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-[#1a1a1a] w-96 max-w-full p-6 rounded-md relative shadow-[0_0_15px_#5c64f4]">
          <button
            className="absolute top-2 right-2 text-gray-300 hover:text-white"
            onClick={onClose}
          >
            ✕
          </button>
          <h3 className="text-xl font-bold mb-4">Descrição do Perfil</h3>
          <p className="text-sm text-gray-400 mb-2">
            Dê uma breve descrição sobre você
          </p>
          <textarea
            maxLength={200}
            className="w-full bg-[#121212] text-white p-2 rounded mb-4 h-24"
            placeholder="About..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={onClose}
              className="bg-gray-600 px-4 py-2 rounded hover:opacity-80"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="bg-[#5c64f4] text-white px-4 py-2 rounded hover:shadow-[0_0_10px_#5c64f4] transition"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // C) Avatar
  function AvatarModal({ onClose }: { onClose: () => void }) {
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (e.target.files && e.target.files[0]) {
        setAvatarFile(e.target.files[0]);
      }
    }

    function handleSave() {
      if (avatarFile) {
        alert(`Avatar salvo: ${avatarFile.name}`);
      } else {
        alert("Nenhum arquivo selecionado");
      }
      onClose();
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-[#1a1a1a] w-80 max-w-full p-6 rounded-md relative shadow-[0_0_15px_#5c64f4]">
          <button
            className="absolute top-2 right-2 text-gray-300 hover:text-white"
            onClick={onClose}
          >
            ✕
          </button>
          <h3 className="text-xl font-bold mb-4">Imagem de Avatar</h3>
          <p className="text-sm text-gray-400 mb-2">
            Selecione um novo avatar para seu perfil
          </p>
          <div className="mb-4">
            <input type="file" onChange={handleFileChange} className="mb-2" />
            {avatarFile && (
              <p className="text-gray-400 text-xs">
                Arquivo selecionado: {avatarFile.name}
              </p>
            )}
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={onClose}
              className="bg-gray-600 px-4 py-2 rounded hover:opacity-80"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="bg-[#5c64f4] text-white px-4 py-2 rounded hover:shadow-[0_0_10px_#5c64f4] transition"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // D) Banner
  function BannerModal({ onClose }: { onClose: () => void }) {
    const [bannerFile, setBannerFile] = useState<File | null>(null);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (e.target.files && e.target.files[0]) {
        setBannerFile(e.target.files[0]);
      }
    }

    function handleSave() {
      if (bannerFile) {
        alert(`Banner salvo: ${bannerFile.name}`);
      } else {
        alert("Nenhum arquivo selecionado");
      }
      onClose();
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-[#1a1a1a] w-80 max-w-full p-6 rounded-md relative shadow-[0_0_15px_#5c64f4]">
          <button
            className="absolute top-2 right-2 text-gray-300 hover:text-white"
            onClick={onClose}
          >
            ✕
          </button>
          <h3 className="text-xl font-bold mb-4">Imagem de Banner</h3>
          <p className="text-sm text-gray-400 mb-2">
            Envie uma nova imagem de banner para seu perfil
          </p>
          <div className="mb-4">
            <input type="file" onChange={handleFileChange} className="mb-2" />
            {bannerFile && (
              <p className="text-gray-400 text-xs">
                Arquivo selecionado: {bannerFile.name}
              </p>
            )}
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={onClose}
              className="bg-gray-600 px-4 py-2 rounded hover:opacity-80"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="bg-[#5c64f4] text-white px-4 py-2 rounded hover:shadow-[0_0_10px_#5c64f4] transition"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // E) Links Sociais
  function SocialLinksModal({ onClose }: { onClose: () => void }) {
    const [selectedLinks, setSelectedLinks] = useState<string[]>([]);

    // Exemplo de plataformas
    const platforms = [
      "Custom",
      "Instagram",
      "Twitter",
      "TikTok",
      "Twitch",
      "Facebook",
      "Youtube",
      "LinkedIn",
    ];

    function handleSelectLink(link: string) {
      // Até 5 links
      if (selectedLinks.length >= 5) {
        alert("Máximo de 5 links alcançado!");
        return;
      }
      setSelectedLinks((prev) => [...prev, link]);
    }

    function handleSave() {
      alert(`Links Sociais salvos: ${selectedLinks.join(", ")}`);
      onClose();
    }

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-[#1a1a1a] w-96 max-w-full p-6 rounded-md relative shadow-[0_0_15px_#5c64f4]">
          <button
            className="absolute top-2 right-2 text-gray-300 hover:text-white"
            onClick={onClose}
          >
            ✕
          </button>
          <h3 className="text-xl font-bold mb-4">Links Sociais</h3>
          <p className="text-sm text-gray-400 mb-2">
            Adicione até 5 links para exibir no seu perfil
          </p>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search (ex: Twitter)"
              className="w-full bg-[#121212] text-white p-2 rounded"
            />
            {/* Lista de plataformas (mock) */}
            <div className="mt-2 max-h-32 overflow-auto border border-gray-600 rounded p-2">
              {platforms.map((plat) => (
                <button
                  key={plat}
                  className="block w-full text-left bg-[#2a2a2a] my-1 px-2 py-1 rounded hover:bg-[#333] text-sm"
                  onClick={() => handleSelectLink(plat)}
                >
                  {plat}
                </button>
              ))}
            </div>
            {/* Exibe os links escolhidos */}
            <div className="mt-2 text-gray-300 text-sm">
              <p>Links Selecionados:</p>
              {selectedLinks.map((link, i) => (
                <span key={i} className="bg-[#5c64f4] text-white px-2 py-1 m-1 inline-block rounded">
                  {link}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              onClick={onClose}
              className="bg-gray-600 px-4 py-2 rounded hover:opacity-80"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="bg-[#5c64f4] text-white px-4 py-2 rounded hover:shadow-[0_0_10px_#5c64f4] transition"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------
  // RETORNO FINAL DA PAGE
  // -------------------------------------------------
  return (
    <div className="bg-[#121212] min-h-screen text-white flex">
      {/* Barra de Navegação Lateral */}
      <aside className="hidden sm:flex flex-col w-60 bg-[#1a1a1a] p-4">
        <div className="flex items-center mb-8">
          <img
            src="/images/logotipo.png"
            alt="LearnConnect Logo"
            className="w-8 h-8 mr-2"
          />
          <span className="text-xl font-bold text-[#5c64f4]">LearnConnect</span>
        </div>

        <nav className="flex flex-col gap-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentRoute("home");
              router.push("/");
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
              setCurrentRoute("popular");
              router.push("/popular");
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
              setCurrentRoute("explore");
              router.push("/explore");
            }}
            className={`flex items-center gap-2 transition ${
              currentRoute === "explore" ? "text-[#5c64f4]" : "hover:text-[#5c64f4]"
            }`}
          >
            <img src="/images/explore.png" alt="Explore" className="w-5 h-5" />
            <span>Explore</span>
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentRoute("discord");
              router.push("/discord");
            }}
            className={`flex items-center gap-2 transition ${
              currentRoute === "discord"
                ? "text-[#5c64f4]"
                : "hover:text-[#5c64f4]"
            }`}
          >
            <img
              src="/images/comunidades.png"
              alt="Discord"
              className="w-5 h-5"
            />
            <span>Discord</span>
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentRoute("topics");
              router.push("/topics");
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
        {/* Barra Superior */}
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

          {isLoggedIn && (
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
                      <li className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer flex items-center gap-2">
                        <img
                          src="/images/editavatar.png"
                          alt="Edit Avatar"
                          className="w-4 h-4"
                        />
                        Edit Avatar
                      </li>
                      <li className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer flex items-center gap-2">
                        <img
                          src="/images/conquistas.png"
                          alt="Conquistas"
                          className="w-4 h-4"
                        />
                        Achievements
                      </li>
                      <li className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer flex items-center gap-2">
                        <img
                          src="/images/contribuicao.png"
                          alt="Contribuição"
                          className="w-4 h-4"
                        />
                        Contributor Program
                      </li>
                      <li className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer flex items-center gap-2">
                        <img
                          src="/images/darkmode.png"
                          alt="Dark Mode"
                          className="w-4 h-4"
                        />
                        Dark Mode
                      </li>
                      <li className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer flex items-center gap-2" onClick={() => router.push("/settings")}>
                        <img
                          src="/images/Config.png"
                          alt="Configurações"
                          className="w-4 h-4"
                        />
                        Settings
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-[#2a2a2a] cursor-pointer flex items-center gap-2 text-red-400"
                        onClick={handleLogout}
                      >
                        <img
                          src="/images/logoff.png"
                          alt="Log Out"
                          className="w-4 h-4"
                        />
                        Log Out
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </header>

        {/* Navegação interna de abas: "Account" e "Profile" */}
        <div className="flex gap-6 border-b border-gray-700 mb-4">
          <button
            className={`pb-2 ${
              activeTab === "account"
                ? "text-white border-b-2 border-[#5c64f4]"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("account")}
          >
            Account
          </button>
          <button
            className={`pb-2 ${
              activeTab === "profile"
                ? "text-white border-b-2 border-[#5c64f4]"
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
        </div>

        {/* Conteúdo de cada aba */}
        {activeTab === "account" && (
          <div className="flex-1 text-sm text-gray-300">
            <AccountTab />
          </div>
        )}
        {activeTab === "profile" && (
          <div className="flex-1 text-sm text-gray-300">
            <ProfileTab />
          </div>
        )}

        {/* Rodapé */}
        <footer className="mt-auto text-center text-gray-500 text-xs pt-8 border-t border-gray-800">
          Regras LearnConnect | Política de Privacidade | Contrato de Usuário |
          LearnConnect, INC 2025, Todos os direitos reservados
        </footer>
      </div>
    </div>
  );
}

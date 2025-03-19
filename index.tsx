import { useState, useEffect, useRef, MouseEvent } from "react";
import { useRouter } from "next/router";

export default function NewHome() {
  // Simular estado de login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Estado e ref para o menu de perfil
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Estado para rota atual (destaca item no menu)
  const [currentRoute, setCurrentRoute] = useState("home");

  const router = useRouter();

  // Estados para curtir, comentários, e compartilhamento
  const [postStates, setPostStates] = useState<
    Record<number, { likes: number; showComments: boolean; showShare: boolean }>
  >({
    1: { likes: 19000, showComments: false, showShare: false },
    2: { likes: 4500, showComments: false, showShare: false },
  });

  // Estado para mostrar aviso se tentar curtir sem login
  const [likeWarnId, setLikeWarnId] = useState<number | null>(null);

  // ---- Novos estados para modais de Login, Cadastro e Redefinir Senha ----
  type ModalType = "login" | "register" | "reset" | "support" | null;
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  // REF para o container que terá scroll (infinite feed)
  const feedRef = useRef<HTMLDivElement>(null);

  // Postagens iniciais
  const initialPosts = [
    {
      id: 1,
      title: "Material-guia de CYBERSECURITY (OSCE³) + WEB3 Research RoadMap",
      author: "u/fursuit",
      authorIcon: "perfil.png", // Novo campo para o ícone do autor
      date: "11 March 2024",
      upvotes: 19000,
      comments: 236,
      shares: 2,
      statusTag: "Revisado/Verificado", // ou "Em Análise"
      tagIcon: "segurancatag.png", // Ex: "programacaotag.png", etc.
      thumbnail: "seguranca.png", // imagem do tema do material
    },
    {
      id: 2,
      title: "Simulado - Exame De Ordem (OAB)",
      author: "u/hfstune",
      authorIcon: "perfil.png",
      date: "8 March 2024",
      upvotes: 4500,
      comments: 164,
      shares: 0,
      statusTag: "Em Análise",
      tagIcon: "idiomastag.png",
      thumbnail: "justica.png",
    },
  ];

  // Armazenamos as postagens em estado para poder carregar mais dinamicamente
  const [allPosts, setAllPosts] = useState(initialPosts);

  // Simula a cada novo "carregamento" a criação de mais 2 posts
  let nextPostId = 3; // track do ID futuro

  function loadMorePosts() {
    // Exemplo: adiciona 2 posts mock a cada carregamento
    const fakePosts = [
      {
        id: nextPostId++,
        title: "Post de Exemplo " + nextPostId,
        author: "u/user" + nextPostId,
        authorIcon: "perfil.png",
        date: "1 April 2025",
        upvotes: Math.floor(Math.random() * 10000),
        comments: Math.floor(Math.random() * 300),
        shares: Math.floor(Math.random() * 50),
        statusTag: Math.random() > 0.5 ? "Revisado/Verificado" : "Em Análise",
        tagIcon: "segurancatag.png",
        thumbnail: "seguranca.png",
      },
      {
        id: nextPostId++,
        title: "Outro Post de Exemplo " + nextPostId,
        author: "u/user" + nextPostId,
        authorIcon: "perfil.png",
        date: "2 April 2025",
        upvotes: Math.floor(Math.random() * 10000),
        comments: Math.floor(Math.random() * 300),
        shares: Math.floor(Math.random() * 50),
        statusTag: Math.random() > 0.5 ? "Revisado/Verificado" : "Em Análise",
        tagIcon: "idiomastag.png",
        thumbnail: "justica.png",
      },
    ];

    setAllPosts((prev) => [...prev, ...fakePosts]);
    // Também inicializa states de likes, etc. caso necessário
    fakePosts.forEach((p) => {
      setPostStates((prevPS) => ({
        ...prevPS,
        [p.id]: { likes: p.upvotes, showComments: false, showShare: false },
      }));
    });
  }

  useEffect(() => {
    // Fechamento do menu de perfil ao clicar fora
    function handleClickOutside(e: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target as Node)
      ) {
        setProfileMenuOpen(false);
      }
    }
    window.addEventListener("mousedown", handleClickOutside as any);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside as any);
    };
  }, []);

  // Efeito para detectar scroll perto do fim e carregar mais posts
  useEffect(() => {
    function handleScroll() {
      const container = feedRef.current;
      if (!container) return;

      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;

      // Se faltam menos de 200px para o final do container, carrega mais
      if (scrollHeight - scrollTop - clientHeight < 200) {
        loadMorePosts();
      }
    }

    const containerEl = feedRef.current;
    if (containerEl) {
      containerEl.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (containerEl) {
        containerEl.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  function goToRoute(routeName: string, path: string) {
    // Destaca no menu
    setCurrentRoute(routeName);
    // Navega
    router.push(path);
  }

  // Determina ícone da tag de status
  function getStatusTagIcon(status: string) {
    if (status === "Revisado/Verificado") return "verificadotag.png";
    if (status === "Em Análise") return "emanalisetag.png";
    return "verificadotag.png"; // fallback
  }

  // -------------- FUNÇÕES DE LOGIN --------------
  const handleLogin = () => {
    if (isLoggedIn) return;
    setActiveModal("login");
  };

  function doLogin() {
    setIsLoggedIn(true);
    setActiveModal(null);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // -------------- FUNÇÕES DO FEED --------------
  function openPostPage(postId: number) {
    alert(`Abrindo página dedicada ao post #${postId}...`);
  }

  function handleLike(postId: number) {
    if (!isLoggedIn) {
      setLikeWarnId(postId);
      return;
    }
    setLikeWarnId(null);
    setPostStates((prev) => {
      const current = prev[postId];
      return {
        ...prev,
        [postId]: {
          ...current,
          likes: current.likes + 1,
        },
      };
    });
  }

  function toggleComments(postId: number) {
    setPostStates((prev) => {
      const current = prev[postId];
      return {
        ...prev,
        [postId]: {
          ...current,
          showComments: !current.showComments,
        },
      };
    });
  }

  function toggleShare(postId: number) {
    setPostStates((prev) => {
      const current = prev[postId];
      return {
        ...prev,
        [postId]: {
          ...current,
          showShare: !current.showShare,
        },
      };
    });
  }

  // -------------- MODAIS --------------
  function LoginModal() {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-[#1a1a1a] w-96 max-w-full p-6 rounded-md relative">
          <button
            className="absolute top-2 right-2 text-gray-300 hover:text-white"
            onClick={() => setActiveModal(null)}
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold mb-4">Entrar</h2>
          <p className="text-sm text-gray-400 mb-4">
            Ao continuar, você concorda com nosso Contrato de Usuário e reconhece
            que compreende nossa Política de Privacidade.
          </p>

          {/* Botões de login externos (ex: Google, Discord, Telefone) */}
          <button className="bg-[#2a2a2a] w-full py-2 mb-2 rounded flex justify-center">
            Continuar com número de telefone
          </button>
          <button className="bg-[#2a2a2a] w-full py-2 mb-2 rounded flex justify-center">
            Continuar como O Caio Duque (Google)
          </button>
          <button className="bg-[#2a2a2a] w-full py-2 mb-4 rounded flex justify-center">
            Continuar com Discord
          </button>

          <div className="text-center text-gray-500 mb-2">OU</div>
          {/* Campos de login local */}
          <div className="mb-2">
            <label className="block text-sm mb-1">Email ou nome de usuário *</label>
            <input
              type="text"
              className="w-full bg-[#121212] p-2 rounded focus:outline-none"
              placeholder="Ex: usuario@email.com"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm mb-1">Senha *</label>
            <input
              type="password"
              className="w-full bg-[#121212] p-2 rounded focus:outline-none"
              placeholder="********"
            />
          </div>
          <div
            className="text-right text-sm text-[#5c64f4] hover:underline cursor-pointer mb-4"
            onClick={() => setActiveModal("reset")}
          >
            Esqueceu a senha?
          </div>
          <button
            className="bg-[#5c64f4] w-full py-2 rounded font-bold hover:opacity-90"
            onClick={doLogin}
          >
            Entrar
          </button>
          <div className="text-center text-sm mt-3">
            Primeira vez no LearnConnect?{" "}
            <span
              className="text-[#5c64f4] cursor-pointer"
              onClick={() => setActiveModal("register")}
            >
              Cadastre-se
            </span>
          </div>
        </div>
      </div>
    );
  }

  function RegisterModal() {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-[#1a1a1a] w-96 max-w-full p-6 rounded-md relative">
          <button
            className="absolute top-2 right-2 text-gray-300 hover:text-white"
            onClick={() => setActiveModal(null)}
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold mb-4">Cadastrar-se</h2>
          <p className="text-sm text-gray-400 mb-4">
            Ao continuar, você concorda com nosso Contrato de Usuário e reconhece
            que compreende nossa Política de Privacidade.
          </p>

          {/* Botões de cadastro externos */}
          <button className="bg-[#2a2a2a] w-full py-2 mb-2 rounded flex justify-center">
            Continuar com número de telefone
          </button>
          <button className="bg-[#2a2a2a] w-full py-2 mb-2 rounded flex justify-center">
            Continuar com O Caio Duque (Google)
          </button>
          <button className="bg-[#2a2a2a] w-full py-2 mb-4 rounded flex justify-center">
            Continuar com Discord
          </button>

          <div className="text-center text-gray-500 mb-2">OU</div>
          {/* Campos de cadastro local */}
          <div className="mb-2">
            <label className="block text-sm mb-1">Email *</label>
            <input
              type="text"
              className="w-full bg-[#121212] p-2 rounded focus:outline-none"
              placeholder="Ex: usuario@email.com"
            />
          </div>
          {/* Você pode incluir outros campos de cadastro aqui */}
          <button className="bg-[#5c64f4] w-full py-2 rounded font-bold hover:opacity-90 mt-4">
            Continuar
          </button>
          <div className="text-center text-sm mt-3">
            Já estuda por aqui?{" "}
            <span
              className="text-[#5c64f4] cursor-pointer"
              onClick={() => setActiveModal("login")}
            >
              Entrar
            </span>
          </div>
        </div>
      </div>
    );
  }

  function ResetPasswordModal() {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-[#1a1a1a] w-96 max-w-full p-6 rounded-md relative">
          <button
            className="absolute top-2 right-2 text-gray-300 hover:text-white"
            onClick={() => setActiveModal(null)}
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold mb-4">Redefina sua senha</h2>
          <p className="text-sm text-gray-400 mb-4">
            Insira o seu email e enviaremos um link para a redefinição da senha
          </p>
          <div className="mb-2">
            <label className="block text-sm mb-1">Email de usuário *</label>
            <input
              type="text"
              className="w-full bg-[#121212] p-2 rounded focus:outline-none"
              placeholder="Seu email cadastrado"
            />
          </div>
          <div
            className="text-sm text-[#5c64f4] hover:underline cursor-pointer mb-4"
            onClick={() => setActiveModal("support")}
          >
            Precisa de ajuda?
          </div>
          <button className="bg-[#5c64f4] w-full py-2 rounded font-bold hover:opacity-90">
            Redefinir senha
          </button>
        </div>
      </div>
    );
  }

  function SupportModal() {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-[#1a1a1a] w-80 max-w-full p-6 rounded-md relative">
          <button
            className="absolute top-2 right-2 text-gray-300 hover:text-white"
            onClick={() => setActiveModal(null)}
          >
            ✕
          </button>
          <h2 className="text-2xl font-bold mb-4">Ajuda e Suporte</h2>
          <p className="text-sm text-gray-400 mb-4">
            Para redefinir a senha, você precisará de acesso ao seu email. Se
            estiver com problemas ou não tiver mais acesso ao email, entre em
            contato com nossa equipe de suporte.
          </p>
          <p className="text-sm text-gray-400">
            Suporte LearnConnect:
            <br />
            <span className="text-[#5c64f4]">suporte@learnconnect.example.com</span>
          </p>
        </div>
      </div>
    );
  }

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

        {/* Menus */}
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
          {/* Campo de busca */}
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
              {/* Botão Criar */}
              <button
                className="flex items-center gap-1 bg-[#1a1a1a] border border-[#5c64f4] rounded-full px-4 py-2 hover:bg-[#2a2a2a]"
                onClick={() => router.push("/create")}
              >
                <img src="/images/criar.png" alt="Criar" className="w-5 h-5" />
                <span>Criar</span>
              </button>

              {/* Notificações */}
              <button className="relative">
                <img
                  src="/images/notificacoes.png"
                  alt="Notificações"
                  className="w-6 h-6"
                />
              </button>

              {/* Ícone de Perfil */}
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

        {/* Conteúdo do Feed COM SCROLL e INFINITE LOAD */}
        <main
          className="flex-1 overflow-y-auto p-4 md:p-6"
          ref={feedRef}
          style={{ scrollBehavior: "smooth" }}
        >
          {/* Lista de Postagens */}
          {allPosts.map((post) => {
            const { likes, showComments, showShare } = postStates[post.id] || {
              likes: post.upvotes,
              showComments: false,
              showShare: false,
            };
            const showLikeWarn = likeWarnId === post.id;

            return (
              <div key={post.id} className="mb-8">
                {/* Retângulo do Post */}
                <div
                  className="bg-[#1a1a1a] rounded-lg p-4 border border-gray-700 cursor-pointer flex justify-between"
                  onClick={() => openPostPage(post.id)}
                >
                  {/* Lado Esquerdo: Título e Autor */}
                  <div>
                    <div className="flex items-center mb-2">
                      {post.statusTag && (
                        <div className="flex items-center gap-1">
                          <img
                            src={`/images/${getStatusTagIcon(post.statusTag)}`}
                            alt="Tag Status"
                            className="w-5 h-5"
                          />
                          <span className="bg-[#5c64f4] text-white text-xs px-2 py-1 rounded-full">
                            {post.statusTag}
                          </span>
                        </div>
                      )}
                      {/* Tema (tagIcon) */}
                      <div className="flex items-center gap-1 ml-4">
                        <img
                          src={`/images/${post.tagIcon}`}
                          alt="Tema"
                          className="w-5 h-5"
                        />
                        <span className="bg-[#5c64f4] text-white text-xs px-2 py-1 rounded-full">
                          Segurança
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-[#bfbfbf] mb-1">
                      {post.title}
                    </h3>
                    {/* ADICIONA ÍCONE DO AUTOR E SEU NOME */}
                    <p className="text-sm text-gray-400 flex items-center gap-1">
                      {/* Ícone do autor, tamanho pequeno */}
                      <img
                        src={`/images/${post.authorIcon}`}
                        alt="Icon Author"
                        className="w-4 h-4 rounded-full"
                      />
                      {post.author} • {post.date}
                    </p>
                  </div>
                  {/* Lado Direito: Thumbnail fixo */}
                  <div>
                    <img
                      src={`/images/${post.thumbnail}`}
                      alt="thumb"
                      className="w-24 h-24 object-cover rounded"
                    />
                  </div>
                </div>

                {/* Ícones de ações (fora do retângulo) */}
                <div className="flex items-center gap-6 text-sm text-gray-400 mt-2 ml-2">
                  {/* Curtir */}
                  <button
                    className="flex items-center gap-1 hover:text-[#5c64f4] transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(post.id);
                    }}
                  >
                    <img src="/images/curtida.png" alt="Like" className="w-4 h-4" />
                    <span
                      className={
                        "transition " + (likes > post.upvotes ? "text-[#5c64f4]" : "")
                      }
                    >
                      {likes >= 1000 ? (likes / 1000).toFixed(1) + "k" : likes}
                    </span>
                  </button>

                  {/* Comentários */}
                  <button
                    className="flex items-center gap-1 hover:text-[#5c64f4] transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleComments(post.id);
                    }}
                  >
                    <img
                      src="/images/comentarios.png"
                      alt="Comments"
                      className="w-4 h-4"
                    />
                    <span>{post.comments}</span>
                  </button>

                  {/* Compartilhar */}
                  <button
                    className="flex items-center gap-1 hover:text-[#5c64f4] transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleShare(post.id);
                    }}
                  >
                    <img
                      src="/images/compartilhar.png"
                      alt="Share"
                      className="w-4 h-4"
                    />
                    <span>{post.shares}</span>
                  </button>
                </div>

                {/* Aviso se não pode curtir */}
                {showLikeWarn && (
                  <div className="ml-8 mt-2 bg-red-900 text-red-200 p-3 rounded w-3/4 sm:w-1/2">
                    <p className="text-sm">
                      Você precisa estar logado para curtir postagens!
                    </p>
                  </div>
                )}

                {/* Seção de Comentários */}
                {showComments && (
                  <div className="ml-8 mt-2 text-gray-300 border-l border-gray-600 pl-2">
                    <p className="italic mb-2">Seção de comentários... (mock)</p>

                    {isLoggedIn ? (
                      <div className="bg-[#1a1a1a] p-2 rounded">
                        <p className="text-sm mb-2">Comentar:</p>
                        {/* Campo de comentário (mock) */}
                        <input
                          type="text"
                          placeholder="Digite seu comentário..."
                          className="w-full p-2 bg-[#121212] text-white rounded"
                        />
                      </div>
                    ) : (
                      <p className="text-sm text-red-300">
                        Você precisa estar logado para comentar!
                      </p>
                    )}
                  </div>
                )}

                {/* Seção de Compartilhar */}
                {showShare && (
                  <div className="ml-8 mt-2 bg-[#1a1a1a] border border-gray-600 p-4 rounded">
                    <p className="mb-2 text-sm">Link para compartilhamento:</p>
                    <div className="bg-[#121212] p-2 rounded mb-2 text-sm">
                      https://learnconnect.example.com/post/{post.id}
                    </div>
                    <p className="mb-2 text-sm">Compartilhar em:</p>
                    <div className="flex items-center gap-4">
                      <img
                        src="/images/discord.png"
                        alt="Discord"
                        className="w-6 h-6 cursor-pointer"
                      />
                      <img
                        src="/images/whatsapp.png"
                        alt="WhatsApp"
                        className="w-6 h-6 cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </main>
      </div>

      {/* Renderiza os modais se "activeModal" estiver definido */}
      {activeModal === "login" && <LoginModal />}
      {activeModal === "register" && <RegisterModal />}
      {activeModal === "reset" && <ResetPasswordModal />}
      {activeModal === "support" && <SupportModal />}
    </div>
  );
}

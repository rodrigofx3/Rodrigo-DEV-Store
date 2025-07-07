const produtos = [
  {
    id: "notebook-dev-pro",
    nome: "Notebook DEV Pro",
    preco: 4999.0,
    categoria: "notebook",
    imagem: "images/notebook-pro.jpg",
    emoji: "💻",
    descricao:
      "Notebook de alta performance para desenvolvimento, Intel i7, 16GB RAM, SSD 512GB e tela Full HD.",
    detalhes: {
      processador: "Intel Core i7-12700H",
      memoria: "16GB DDR4",
      armazenamento: "SSD 512GB NVMe",
      tela: '15.6" Full HD IPS',
      placa_video: "Intel Iris Xe Graphics",
      sistema: "Windows 11 Pro",
    },
  },
  {
    id: "smartphone-dev-plus",
    nome: "Smartphone DEV Plus",
    preco: 2299.0,
    categoria: "smartphone",
    imagem: "images/smartphone-dev.jpg",
    emoji: "📱",
    descricao:
      "Smartphone Android premium para testes de apps, 8GB RAM, 256GB storage e tela AMOLED.",
    detalhes: {
      sistema: "Android 14",
      processador: "Snapdragon 888",
      memoria: "8GB RAM",
      armazenamento: "256GB",
      tela: '6.7" AMOLED 120Hz',
      camera: "108MP + 12MP + 12MP",
    },
  },
  {
    id: "teclado-mecanico-code",
    nome: "Teclado Mecânico Code",
    preco: 459.0,
    categoria: "teclado",
    imagem: "images/teclado-mecanico.jpg",
    emoji: "⌨️",
    descricao:
      "Teclado mecânico RGB com switches Cherry MX Blue, layout ABNT2 e iluminação personalizável.",
    detalhes: {
      switches: "Cherry MX Blue",
      layout: "ABNT2 (Português)",
      iluminacao: "RGB personalizável",
      conectividade: "USB-C",
      material: "Alumínio e ABS",
      extras: "Teclas extras programáveis",
    },
  },
  {
    id: "mouse-precision-dev",
    nome: "Mouse Precision DEV",
    preco: 189.0,
    categoria: "mouse",
    imagem: "images/mouse-precision.jpg",
    emoji: "🖱️",
    descricao:
      "Mouse ergonômico de alta precisão, 12000 DPI, 7 botões programáveis e design confortável.",
    detalhes: {
      dpi: "12.000 DPI ajustável",
      botoes: "7 botões programáveis",
      sensor: "Óptico de alta precisão",
      conectividade: "USB 2.0",
      ergonomia: "Design para destros",
      peso: "95g",
    },
  },
  {
    id: "monitor-ultrawide-code",
    nome: "Monitor UltraWide CODE",
    preco: 2799.0,
    categoria: "monitor",
    imagem: "images/monitor-ultrawide.jpg",
    emoji: "🖥️",
    descricao:
      'Monitor 34" UltraWide 3440x1440, ideal para múltiplas janelas de código, USB-C e HDR.',
    detalhes: {
      tamanho: "34 polegadas",
      resolucao: "3440 x 1440 (UWQHD)",
      taxa_atualizacao: "144Hz",
      painel: "IPS",
      conectividade: "USB-C, HDMI, DisplayPort",
      recursos: "HDR10, AMD FreeSync",
    },
  },
  {
    id: "headset-dev-audio",
    nome: "Headset DEV Audio",
    preco: 899.0,
    categoria: "headset",
    imagem: "images/headset-dev.jpg",
    emoji: "🎧",
    descricao:
      "Headset premium com cancelamento de ruído ativo, microfone destacável e conforto para longas horas.",
    detalhes: {
      cancelamento_ruido: "Ativo (ANC)",
      microfone: "Destacável com supressão de ruído",
      conectividade: "Bluetooth 5.0 + USB-C",
      bateria: "Até 30h com ANC",
      drivers: "40mm neodímio",
      peso: "280g",
    },
  },
];

// Função para buscar produto por ID
function buscarProduto(id) {
  return produtos.find((produto) => produto.id === id);
}

// Função para formatar preço
function formatarPreco(preco) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(preco);
}

// Função para carregar detalhes do produto
function carregarDetalhesProduto(id) {
  const produto = buscarProduto(id);

  if (!produto) {
    mostrarErro();
    return;
  }

  // Atualizar título da página
  const pageTitle = document.getElementById("page-title");
  if (pageTitle) {
    pageTitle.textContent = `${produto.nome} - Rodrigo DEV Store`;
  }

  const breadcrumbProduct = document.getElementById("breadcrumb-product");
  if (breadcrumbProduct) {
    breadcrumbProduct.textContent = produto.nome;
  }

  // Atualizar conteúdo do produto
  const productName = document.getElementById("product-name");
  if (productName) {
    productName.textContent = produto.nome;
  }

  const productDescription = document.getElementById("product-description");
  if (productDescription) {
    productDescription.textContent = produto.descricao;
  }

  const productPrice = document.getElementById("product-price");
  if (productPrice) {
    productPrice.textContent = formatarPreco(produto.preco);
  }

  // Atualizar imagem
  const imageContainer = document.getElementById("product-main-image");
  if (imageContainer) {
    imageContainer.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" 
           class="product-detail-image" 
           onerror="this.style.display='none'; this.parentNode.innerHTML='${produto.emoji}';">
      ${produto.emoji}
    `;
  }

  // Atualizar especificações
  const specsContainer = document.getElementById("product-specs");
  if (specsContainer) {
    specsContainer.innerHTML = "";

    Object.entries(produto.detalhes).forEach(([key, value]) => {
      const dt = document.createElement("dt");
      const dd = document.createElement("dd");

      dt.textContent =
        key
          .replace(/_/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()) + ":";
      dt.style.fontWeight = "600";
      dt.style.color = "#495057";

      dd.textContent = value;
      dd.style.color = "#666";

      specsContainer.appendChild(dt);
      specsContainer.appendChild(dd);
    });
  }

  // Configurar botão adicionar ao carrinho
  const addToCartBtn = document.getElementById("add-to-cart-btn");
  if (addToCartBtn) {
    addToCartBtn.onclick = function () {
      simularCompra(produto.nome);
    };
  }

  // Carregar produtos relacionados
  carregarProdutosRelacionados(produto.categoria, produto.id);

  // Mostrar conteúdo
  const productContent = document.getElementById("product-content");
  if (productContent) {
    productContent.style.display = "grid";
  }
}

// Função para carregar produtos relacionados
function carregarProdutosRelacionados(categoria, currentId) {
  const relacionados = produtos
    .filter((p) => p.categoria !== categoria && p.id !== currentId)
    .slice(0, 3);
  const container = document.getElementById("related-products-grid");

  if (container) {
    container.innerHTML = relacionados
      .map(
        (produto) => `
      <div class="product-card card">
        <div class="product-image image-placeholder">
          <img src="${produto.imagem}" alt="${produto.nome}" 
               onerror="this.style.display='none'; this.parentNode.innerHTML='${produto.emoji}';">
          ${produto.emoji}
        </div>
        <div class="product-info">
          <h3 class="product-title">${produto.nome}</h3>
          <p class="product-desc">${produto.descricao.substring(0, 80)}...</p>
          <div class="product-price">${formatarPreco(produto.preco)}</div>
          <a href="detalhes.html?id=${produto.id}" class="btn btn-primary">Ver Detalhes</a>
        </div>
      </div>
    `
      )
      .join("");
  }
}

// Função para simular compra
function simularCompra(nomeProduto) {
  adicionarAoCarrinho();
  alert(
    `🎉 "${nomeProduto}" foi adicionado ao seu carrinho!`
  );
}

// Inicializar página de detalhes quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
  // Verificar se estamos na página de detalhes
  if (window.location.pathname.includes("detalhes.html")) {
    // Pegar ID do produto da URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (productId) {
      carregarDetalhesProduto(productId);
    } else {
      mostrarErro();
    }
  }
});

// Configurações para animações de entrada
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  observerOptions
);

// Aplicar animação aos cards quando a página carregar
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".product-card");

  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });
});

// Função para alternar o menu mobile
function toggleMenu() {
  const navMenu = document.getElementById("nav-menu");
  if (navMenu) {
    navMenu.classList.toggle("active");
  }
}

// Fechar menu ao clicar em um link (melhor UX)
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-menu a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const navMenu = document.getElementById("nav-menu");
      if (navMenu) {
        navMenu.classList.remove("active");
      }
    });
  });
});

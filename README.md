# EchoHub - Website Profissional

> Solução Inteligente de Atendimento para Pequenas e Médias Empresas

Website moderno e profissional para o EchoHub, plataforma inovadora que integra chatbots de IA com atendimento humano para PMEs.

![EchoHub](https://img.shields.io/badge/Status-Live-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Sobre o Projeto

EchoHub é uma plataforma inovadora de comunicação que ajuda pequenas e médias empresas a automatizar e aprimorar o atendimento ao cliente de forma eficaz. Este website apresenta todas as funcionalidades, benefícios e casos de uso da plataforma com um design premium e moderno.

## ✨ Características

### Design e UX
- **Apple-like Design**: Interface clean, minimalista e premium
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Animações Fluidas**: Transições suaves e microinterações impressionantes
- **Acessibilidade**: ARIA labels e navegação por teclado

### Tecnologias Utilizadas

#### Frontend
- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Animações, Grid, Flexbox, Custom Properties
- **JavaScript ES6+**: Interatividade moderna e performática

#### Bibliotecas Externas (via CDN)
- **AOS (Animate On Scroll)**: Animações ao rolar a página
- **Particles.js**: Background animado com partículas
- **Typed.js**: Efeito de digitação no hero
- **Font Awesome 6**: Ícones modernos e escaláveis

## 📁 Estrutura do Projeto

```
echo-hub-website/
├── index.html              # Página principal
├── css/
│   └── styles.css         # Estilos e animações
├── js/
│   └── script.js          # JavaScript para interatividade
├── assets/
│   ├── images/            # Imagens do site
│   └── icons/             # Ícones SVG customizados
└── README.md              # Documentação
```

## 🎨 Paleta de Cores

```css
/* Cores Principais */
--primary-color: #1e3a8a    /* Azul profissional */
--secondary-color: #10b981   /* Verde tecnológico */
--accent-color: #f59e0b      /* Laranja para CTAs */

/* Neutras */
--bg-primary: #ffffff
--bg-secondary: #f8fafc
--text-primary: #1e293b
--text-secondary: #64748b
```

## 📱 Seções do Website

### 1. Hero Section
- Título principal com gradiente animado
- Efeito de digitação no subtítulo
- CTAs destacados
- Mockup de smartphone com chat animado
- Estatísticas com contadores animados

### 2. Visão Geral
- Explicação completa sobre o EchoHub
- 4 features principais com ícones
- Dashboard mockup animado
- Grid responsivo

### 3. Benefícios (7 cards)
1. Atendimento ágil e sempre disponível
2. Melhoria da satisfação do cliente
3. Redução de custos operacionais
4. Implementação fácil e rápida
5. Experiência de uso premium
6. Segurança e controle aprimorado
7. Aumento de vendas e conversões

### 4. Funcionalidades (8 features)
- Múltiplos agentes de IA
- Roteamento inteligente
- Encaminhamento para humanos
- Integração WhatsApp
- Múltiplas unidades de negócio
- Análise de sentimento
- Templates prontos
- Interface unificada

### 5. Casos de Uso (3 cards)
- Varejo e E-commerce
- Prestadores de Serviços
- Suporte Técnico

### 6. Como Começar (Timeline)
6 passos ilustrados para implementar o EchoHub

### 7. Contato
- Formulário funcional
- Informações de contato
- Features destacadas

### 8. Footer
- Links rápidos
- Redes sociais
- Informações legais

## 🚀 Como Usar

### Instalação Local

1. Clone o repositório:
```bash
git clone https://github.com/gsrcodes/echo-hub-website.git
```

2. Navegue até o diretório:
```bash
cd echo-hub-website
```

3. Abra o arquivo `index.html` em seu navegador:
```bash
# No macOS
open index.html

# No Windows
start index.html

# No Linux
xdg-open index.html
```

Ou use um servidor local:
```bash
# Python 3
python -m http.server 8000

# Node.js (http-server)
npx http-server

# PHP
php -S localhost:8000
```

Acesse: `http://localhost:8000`

## 📱 Responsividade

O site é totalmente responsivo e otimizado para:

- **Desktop**: 1200px+ (layout completo com efeitos 3D)
- **Tablet**: 768px - 1199px (layout adaptado)
- **Mobile**: 320px - 767px (menu hamburger, layout vertical)

### Breakpoints CSS

```css
/* Mobile First */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1200px) { /* Large Desktop */ }
```

## ⚡ Performance

### Otimizações Implementadas

- ✅ Lazy loading de imagens
- ✅ Debounce em eventos de scroll
- ✅ CSS minificado e organizado
- ✅ Bibliotecas via CDN (cache do navegador)
- ✅ Intersection Observer para animações
- ✅ Smooth scrolling nativo
- ✅ Assets otimizados

### Métricas Esperadas

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🎯 Funcionalidades JavaScript

### Animações
- ✅ Contador animado de estatísticas
- ✅ Efeito de digitação (Typed.js)
- ✅ Scroll animations (AOS)
- ✅ Partículas no background
- ✅ Hover 3D em cards
- ✅ Parallax no hero

### Interatividade
- ✅ Menu mobile responsivo
- ✅ Smooth scroll para âncoras
- ✅ Botão scroll to top
- ✅ Formulário de contato
- ✅ Notificações toast
- ✅ Highlight do link ativo

### Acessibilidade
- ✅ Skip to content link
- ✅ ARIA labels
- ✅ Navegação por teclado
- ✅ Foco visível
- ✅ Contraste adequado

## 🔧 Customização

### Alterar Cores

Edite as variáveis CSS em `css/styles.css`:

```css
:root {
    --primary-color: #1e3a8a;
    --secondary-color: #10b981;
    --accent-color: #f59e0b;
    /* ... */
}
```

### Alterar Conteúdo

Edite o arquivo `index.html` diretamente. Todo o conteúdo está em português e bem estruturado.

### Adicionar Novas Seções

1. Adicione o HTML na posição desejada
2. Estilize usando as classes utilitárias existentes
3. Adicione animações com `data-aos` attributes

## 🌐 Deploy

### GitHub Pages

1. Faça commit de todas as alterações
2. Push para o branch `main`
3. Vá em Settings > Pages
4. Selecione o branch `main` como source
5. Site estará disponível em: `https://gsrcodes.github.io/echo-hub-website/`

### Netlify

1. Conecte o repositório GitHub
2. Deploy automático em cada push
3. Configuração zero necessária

### Vercel

1. Importe o repositório
2. Deploy instantâneo
3. HTTPS automático

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Contribuindo

Contribuições são sempre bem-vindas! Sinta-se livre para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## 📞 Contato

- **Email**: contato@echohub.com.br
- **Telefone**: +55 (11) 99999-9999
- **Website**: [echohub.com.br](https://echohub.com.br)

## 🙏 Agradecimentos

- [Font Awesome](https://fontawesome.com/) - Ícones
- [AOS](https://michalsnik.github.io/aos/) - Scroll animations
- [Particles.js](https://vincentgarreau.com/particles.js/) - Background particles
- [Typed.js](https://mattboldt.com/demos/typed-js/) - Typing effect

---

<p align="center">
  Feito com ❤️ para transformar o atendimento de PMEs
</p>

<p align="center">
  <strong>EchoHub</strong> - Solução Inteligente de Atendimento
</p>

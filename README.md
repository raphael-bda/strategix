# Strategix 📊

Olá! Este é o Strategix, um dashboard de inside sales que nasceu de um desafio pessoal: pegar um protótipo funcional, feito em um único arquivo HTML, e reconstruí-lo do zero como uma aplicação web moderna, robusta e, claro, bonita.

A ideia era não só replicar as funcionalidades, mas elevá-las, aplicando as melhores práticas de arquitetura front-end que uso no dia a dia.

**Curioso para ver o resultado? Acesse a demo ao vivo!**
**[https://strategix-demo.vercel.app/](strategix-flame.vercel.app)**

<br/>

![Pré-visualização do Dashboard Strategix](https://i.imgur.com/your-image-url.png)

---

## 📖 A Jornada: Do Rascunho à Realidade

Tudo começou com o `dashboard_final_v9.html`. Era uma página única, funcional, mas que implorava por uma estrutura mais escalável e moderna. Encarei isso como uma oportunidade de simular um cenário real de refatoração de um sistema legado.

Meu objetivo foi claro:
1.  **Desacoplar o código:** Separar estrutura (HTML), estilo (CSS) e lógica (JavaScript).
2.  **Adotar a reatividade:** Deixar de manipular o DOM manualmente e passar a ter uma interface que reage automaticamente às mudanças nos dados.
3.  **Criar uma experiência de usuário fluida:** Adicionar feedback visual, animações e uma navegação intuitiva.

Essa jornada de depuração e desenvolvimento foi intensa (especialmente ao domar os gráficos!), mas o resultado é uma aplicação da qual me orgulho muito.

---

## ✨ O Que o Strategix Faz?

- **Análise em Tempo Real:** Esqueça planilhas estáticas. Aqui, cada número que você insere nos inputs mensais atualiza os KPIs e os gráficos na hora.
- **Visão Macro e Micro:** Alterne facilmente entre a performance consolidada do ano inteiro e a análise detalhada de um único mês com um clique no filtro de período.
- **Controle Total de Campanhas:** Crie, edite e remova campanhas de marketing em uma interface simples, com as listas se animando a cada alteração.
- **Flexibilidade com Seus Dados:** Exporte um relatório em `.csv` da sua visão geral para usar em outras ferramentas, ou faça um backup completo do estado do dashboard com o export/import de `.json`.
- **Uma UI Agradável:** O tema escuro com o fundo "Aurora" dinâmico foi pensado para ser confortável para longas sessões de análise de dados.

---

## 🛠️ Minha Caixa de Ferramentas

Para tirar esse projeto do papel, usei algumas das minhas tecnologias favoritas do ecossistema front-end:

- **Vue.js 3 (Composition API):** Pela sua reatividade elegante e organização do código.
- **Vite:** Para uma experiência de desenvolvimento absurdamente rápida.
- **TypeScript:** Para um código mais seguro e fácil de manter.
- **Pinia:** Para um gerenciamento de estado centralizado, simples e poderoso.
- **Tailwind CSS:** Para construir uma UI consistente e customizada sem escrever uma linha de CSS tradicional.
- **ECharts:** Para os gráficos, integrado de forma robusta através do `vue-echarts`.

---

## 🚀 Quer Testar na Sua Máquina?

Ficou curioso para explorar o código? É bem simples:

1.  **Clone o projeto:**
    ```bash
    git clone [https://github.com/raphael-bda/strategix.git](https://github.com/SEU_USUARIO/strategix.git)
    ```
    *(Lembre-se de trocar pela URL do seu repositório)*

2.  **Entre na pasta:**
    ```bash
    cd strategix
    ```

3.  **Instale os pacotes:**
    ```bash
    npm install
    ```

4.  **Rode o servidor:**
    ```bash
    npm run dev
    ```

E pronto! Agora é só abrir o link que aparecer no seu terminal.

---

## 📄 Licença

Distribuído sob a licença MIT.

---

## 👨‍💻 Fale Comigo!

Adorei trabalhar neste projeto. Se você tiver alguma dúvida, sugestão ou só quiser trocar uma ideia sobre tecnologia, me encontre aqui:

**Raphael Barbosa**

- GitHub: [@raphael-bda](https://github.com/raphael-bda)
- LinkedIn: [in/raphael-bda](https://linkedin.com/in/raphael-bda)

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ---- LISTA 1: artistas (cada um tem um id) ----
const artistas = [
  { id: 1, nome: "Anitta", pais: "Brasil" },
  { id: 2, nome: "The Weeknd", pais: "Canadá" },
  { id: 3, nome: "Dua Lipa", pais: "Reino Unido" },
  { id: 4, nome: "Bruno Mars", pais: "Estados Unidos" },
];

// ---- LISTA 2: músicas (guardam só o artistaId, não o nome) ----
const musicas = [
  { titulo: "Envolver", duracao: 193, artistaId: 1 },
  { titulo: "Downtown", duracao: 193, artistaId: 1 },
  { titulo: "Blinding Lights", duracao: 200, artistaId: 2 },
  { titulo: "Save Your Tears", duracao: 215, artistaId: 2 },
  { titulo: "Levitating", duracao: 203, artistaId: 3 },
  { titulo: "Don't Start Now", duracao: 183, artistaId: 3 },
  { titulo: "Just the Way You Are", duracao: 221, artistaId: 4 },
  { titulo: "Locked Out of Heaven", duracao: 233, artistaId: 4 },
];

app.use(express.static(path.join(__dirname, "public")));

// 1) LISTAR ARTISTAS
app.get("/artistas", (req, res) => {
  res.status(200).json(artistas);
});

// 2) LISTAR MÚSICAS (juntando cada música com o seu artista)
app.get("/musicas", (req, res) => {
  const musicasComArtistas = musicas.map((m) => {
    const artista = artistas.find((a) => a.id === m.artistaId);

    return {
      titulo: m.titulo,
      duracao: m.duracao,
      artista: artista ? artista.nome : "Desconhecido",
      pais: artista ? artista.pais : "Desconhecido",
    };
  });

  res.status(200).json(musicasComArtistas);
});

app.listen(PORT, () => {
  console.log(`API de playlist rodando em http://localhost:${PORT}`);
});

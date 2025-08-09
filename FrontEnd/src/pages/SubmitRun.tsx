import { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from "react-router-dom";
import Input from "../assets/components/Input/Input";
import Select from "../assets/components/Select/Select";
import Button from "../assets/components/Button/Button";
import Body from "../assets/components/Body/Body";

type Game = {
  id: number,
  title: string,
  release_year: number,
  platform: string
}

type Category = {
  id: number,
  name: string
}


export default function SubmitRun() {
  const [games, setGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [gameId, setGameId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [time, setTime] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const userId = user?.id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gamesRes = await api.get<Game[]>("/game");
        const categoriesRes = await api.get<Category[]>("/category");
        setGames(gamesRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      console.log({userId,
          gameId,
          categoryId,
          time: parseInt(time),
          videoUrl});
      await api.post(
        "/speedrun",
        {
          userId,
          gameId: parseInt(gameId),
          categoryId: parseInt(categoryId),
          timeSeconds: parseInt(time),
          videoUrl,
        }
      );
      navigate("/Profile");
    } catch (err) {
      console.error(err);
      setMessage("Erro ao submeter run.");
    }
  };

  return (
    <Body>
      <h2 className="white-text">Submeter uma Speedrun</h2>

      <form className="row" onSubmit={handleSubmit}>
        <Select
          required
          label="Jogo:"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          options={games.map((game) => ({
            value: game.id,
            label: game.title,
          }))}
        />
        <Select
          required
          label="Categoria:"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          options={categories.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))}
        />
        <Input
          label='Tempo (em segundos):'
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <Input
          label='URL do vídeo:'
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
        />
        <div>
          <Button label ="Enviar Run" type="submit"/>
        </div>
      </form>

      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </Body>
  );
}

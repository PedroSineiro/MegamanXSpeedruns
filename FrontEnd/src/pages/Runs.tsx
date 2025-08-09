import { useEffect, useState } from "react";
import api from "../utils/api";
import first from "../assets/img/First.png";
import second from "../assets/img/Second.png";
import third from "../assets/img/Third.png";
import { Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import Button from "../assets/components/Button/Button";
import Select from "../assets/components/Select/Select";
import Body from "../assets/components/Body/Body";

type Game = {
  id: number;
  title: string;
  release_year: number;
  platform: string;
};

type Category = {
  id: number;
  name: string;
};

type Speedrun = {
  id: number;
  timeSeconds: number;
  submittedAt: string;
  videoUrl:string;
  user: {
    id: number;
    username: string;
  };
};

export default function Runs() {
  const [games, setGames] = useState<Game[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [runs, setRuns] = useState<Speedrun[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

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

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSearch = async () => {
    if (!selectedGame || !selectedCategory) {
      setError("Selecione um jogo e uma categoria.");
      return;
    }

    try {
      setError(null);
      console.log(selectedGame);
      console.log(selectedCategory);
      const res = await api.get<Speedrun[]>(
        `/speedrun?gameId=${selectedGame}&categoryId=${selectedCategory}`
      );
      setRuns(res.data);
    } catch (err) {
      console.error("Erro ao buscar runs:", err);
      setError("Erro ao buscar runs.");
    }
  };

  return (
    <Body>
      <h1 className="white-text">Speedruns Enviadas</h1>
        <Select
        required
        label="Jogo:"
        value={selectedGame ?? ""}
        onChange={(e) => setSelectedGame(Number(e.target.value))}
        options={games.map((game) => ({
          value: game.id,
          label: game.title,
        }))}/>
        <Select
        required
        label="Categoria:"
        value={selectedCategory ?? ""}
        onChange={(e) => setSelectedCategory(Number(e.target.value))}
        options={categories.map((cat) => ({
          value: cat.id,
          label: cat.name,
        }))}/>
        <Button onClick={handleSearch} style={{margin: "2em"}} label="Buscar"/>
        {user? <div>
        <span className='link'><Link to="/submit" >Enviar Run</Link></span>
        </div>: null}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <table cellPadding={6} className="white-text table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Jogador</th>
            <th>Tempo</th>
            <th>Data de Submissão</th>
            <th>Vídeo</th>
          </tr>
        </thead>
      {runs.length > 0 && (
          <tbody>
            {runs.map((run, index) => (
              <tr key={run.id}>
                <td>{index === 0 ? (
                  <img src={first} alt="1º lugar" width={24} />
                ) : index === 1 ? (
                  <img src={second} alt="2º lugar" width={24} />
                ) : index === 2 ? (
                  <img src={third} alt="3º lugar" width={24} />
                ) : (
                  index + 1
                )}</td>
                <td>{run.user.username}</td>
                <td>{formatTime(run.timeSeconds)}</td>
                <td>{new Date(run.submittedAt).toLocaleString("pt-BR")}</td>
                <td>{run.videoUrl ? (
                    <span className='link'><a href={run.videoUrl} target="_blank" rel="noopener noreferrer">
                        Assistir
                    </a></span>
                    ) : (
                    'Sem vídeo'
                    )}</td>
              </tr>
            ))}
          </tbody>
      )}
        </table>
    </Body>
  );
}

import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import { Link } from 'react-router-dom';
import './pages.css';
import Body from '../assets/components/Body/Body';
import Button from '../assets/components/Button/Button';

type Speedrun = {
  id: number;
  game: { title: string };
  category: { name: string };
  timeSeconds: number;
  videoUrl: string;
  accepted: boolean | null;
};

export default function Profile() {
    const { user } = useAuth();
    const [runs, setRuns] = useState<Speedrun[]>([]);
    const [reviewRuns,setReviewRuns] = useState<Speedrun[]>([]);
    const [veredicts, setVeredicts] = useState<Record<number, string>>({}); 


    const sendVeredict = async ( runId: number, veredict: string) => {
        
        if(veredict!==""){
            try {
            await api.patch(`/speedrun/${runId}`, { accepted: veredict === 'true' });

            setReviewRuns((prev) => prev.filter((run) => run.id !== runId));

            setVeredicts((prev) => {
            const updated = { ...prev };
            delete updated[runId];
            return updated;
            });
            } catch (error) {
                console.error('Erro ao enviar veredito:', error);
            }
        }
    };

    useEffect(() => {
        const fetchRuns = async () => {
        try {
            const token = localStorage.getItem('token');
            let response = await api.get<Speedrun[]>('/speedrun/user/'+user?.id, {withCredentials: true });
            setRuns(response.data);
            response = await api.get<Speedrun[]>('/speedrun/reviewer/'+user?.id, {withCredentials: true });
            setReviewRuns(response.data);
            
        } catch (error) {
            console.error('Erro ao buscar speedruns:', error);
        }
        };

    fetchRuns();
  }, []);
    const isReviewer = user?.isReviewer?"Sim":"Não";
     return (
        <Body>
        <div className="card bg-dark text-light mb-4 shadow-sm border border-secondary">
            <div className="card-body d-flex align-items-center">
            <div>
                <h3 className="mb-1">{user?.username}</h3>
                {isReviewer?(<><h3>Moderador</h3></>):null}
            </div>
            </div>
        </div>

        <h3 className="white-text">Minhas Speedruns</h3>
        <table border={1} cellPadding={6} className="white-text table-bordered">
            <thead>
            <tr>
                <th>Jogo</th>
                <th>Categoria</th>
                <th>Tempo (s)</th>
                <th>Vídeo</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {runs.map((run) => (
                <tr key={run.id}>
                <td>{run.game.title}</td>
                <td>{run.category.name}</td>
                <td>{run.timeSeconds}</td>
                <td>
                    {run.videoUrl ? (
                    <span className='link'><a href={run.videoUrl} target="_blank" rel="noopener noreferrer">
                        Assistir
                    </a></span>
                    ) : (
                    'Sem vídeo'
                    )}
                </td>
                <td>
                    {run.accepted === null
                    ? 'Pendente'
                    : run.accepted
                    ? 'Aceita'
                    : 'Rejeitada'}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        <span className='link mb-4'><Link to="/submit" >Enviar Run</Link></span>
        {user?.isReviewer ? (
        <>
        <h3 className="white-text">Speedruns para Revisar</h3>
          <table border={1} cellPadding={6} className="white-text table-bordered">
            <thead>
            <tr>
                <th>Jogo</th>
                <th>Categoria</th>
                <th>Tempo (s)</th>
                <th>Vídeo</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {reviewRuns.map((run) => (
                <tr key={run.id}>
                <td>{run.game.title}</td>
                <td>{run.category.name}</td>
                <td>{run.timeSeconds}</td>
                <td>
                    {run.videoUrl ? (
                    <span className='link'><a href={run.videoUrl} target="_blank" rel="noopener noreferrer">
                        Assistir
                    </a></span>
                    ) : (
                    'Sem vídeo'
                    )}
                </td>
                <td>
                    <select
                value={veredicts[run.id] || ''}
                onChange={(e) => setVeredicts((prev) => ({ ...prev, [run.id]: e.target.value }))}
                >
                <option value="">Selecione um veredito</option>
                <option value="true">Aprovada</option>
                <option value="false">Reprovada</option>
                </select>
                <Button
                    label="Enviar"
                    onClick={() => sendVeredict(run.id, veredicts[run.id])}
                />
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </>
        ) : null}
        </Body>
    );
}
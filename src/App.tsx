import GameBoard from './components/GameBoard';
import ScoreBoard from './components/ScoreBoard';
import HistoryPanel from './components/HistoryPanel';

export default function App() {
  return (
    <main className="grid min-h-[50vh]">
      <article className="flex flex-col p-4 gap-6 justify-center items-center">
        <section className="bg-white rounded flex flex-col p-8 gap-6 justify-center items-center">
          <h1 className="text-4xl font-bold select-none">Tic-Tac-Toe</h1>
          <GameBoard />
          <ScoreBoard />
          <HistoryPanel />
        </section>
      </article>
    </main>
  );
}

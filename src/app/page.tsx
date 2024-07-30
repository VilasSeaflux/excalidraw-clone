import Menu from '@/components/organisms/Menu';
import { Toolbox } from '@/components/organisms/Toolbox';
import Board from '@/components/wrappers/Board';

export default function Home() {
  return (
    <main>
        <Menu />
        <Toolbox />
       <Board />
    </main>
  );
}

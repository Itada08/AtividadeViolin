import ListarUsuarios from './components/ListarUsuarios'
import StatusAPI from './components/StatusAPI'

export default function App() {
    return (
        <>
            <h1>Listar Usuários</h1>
            <ListarUsuarios />

            <h1>Status da API</h1>
            <StatusAPI />
        </>
    )
}
import { useEffect, useState } from 'react'


export default function ListarUsuarios() {
    const [usuarios, setUsuarios] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(null)

    useEffect(() => {
        const controle = new AbortController()  // cria um controle
        const signal = controle.signal          // o signal vigia a requisição
        async function buscar() {
            try {
                setCarregando(true)
                setErro(null)
                const resp = await fetch('https://jsonplaceholder.typicode.com/users', { signal })
                if (!resp.ok) {
                    // 4xx ou 5xx — fetch NÃO rejeita para esses status! Precisamos lançar à mão.
                    throw new Error(`HTTP ${resp.status} — ${resp.statusText}`)
                }
                const data = await resp.json()
                setUsuarios(data)
            } catch (e) {
                if (e.name !== 'AbortError') {
                    // Ignora AbortError: é quando nós mesmos cancelamos
                    setErro(e.message)
                }
            } finally {
                setCarregando(false)
            }
        }
        buscar()

        return () => controle.abort()
    }, [])

    if (carregando) return <p>Carregando...</p>
    if (erro) return <p>Erro: {erro}</p>
    if (usuarios.length === 0) return <p>Nenhum usuário encontrado.</p>

        return (
        <ul>
            {usuarios.map(u => (
                <li key={u.id}>{u.name}</li>
            ))}
        </ul>
    )
}

import { useEffect, useState } from 'react'

export default function StatusAPI() {
    const [itens, setItens] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState(null)

    useEffect(() => {
        const controle = new AbortController()
        const signal = controle.signal

        async function buscar() {
            try {
                setCarregando(true)
                setErro(null)

                
                const resp = await fetch('https://jsonplaceholder.typicode.com/users', { signal })

               

                if (!resp.ok) throw new Error(`HTTP ${resp.status}`)

               
                const data = await resp.json()

                setItens(data)
            } catch (e) {
                if (e.name !== 'AbortError') {
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
    if (itens.length === 0) return <p>Nenhum item encontrado.</p>

    return <p>Sucesso: {itens.length} itens carregados.</p>
}
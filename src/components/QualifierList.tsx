import "./QualifierList.css"

const qualifiers = [
  { id: "qualifier-1", label: "inciso I", value: "mediante paga ou promessa de recompensa, ou por outro motivo torpe" },
  { id: "qualifier-2", label: "inciso II", value: "por motivo fútil" },
  { id: "qualifier-3", label: "inciso III", value: "com emprego de veneno, fogo, explosivo, asfixia, tortura ou outro meio insidioso ou cruel, ou de que possa resultar perigo comum" },
  { id: "qualifier-4", label: "inciso IV", value: "à traição, de emboscada, ou mediante dissimulação ou outro recurso que dificulte ou torne impossível a defesa do ofendido" },
  { id: "qualifier-5", label: "inciso V", value: "para assegurar a execução, a ocultação, a impunidade ou vantagem de outro crime" },
  { id: "qualifier-6", label: "inciso VI", value: "contra a mulher por razões da condição de sexo feminino" },
  { id: "qualifier-7", label: "inciso VII", value: "contra autoridade ou agente descrito nos arts. 142 e 144 da Constituição Federal, integrantes do sistema prisional e da Força Nacional de Segurança Pública, no exercício da função ou em decorrência dela, ou contra seu cônjuge, companheiro ou parente consanguíneo até terceiro grau, em razão dessa condição" },
  { id: "qualifier-8", label: "inciso VIII", value: "com emprego de arma de fogo de uso restrito ou proibido" },
  { id: "qualifier-9", label: "inciso IX", value: "contra menor de 14 (quatorze) anos" },
]

export default function QualifierList() {
  return (
    <div>
      {qualifiers.map(qualifier => (
        <div key={qualifier.id}>
          <input type="checkbox" id={qualifier.id} name={qualifier.id} value={qualifier.value} />
          <div className="tooltip">
            <label htmlFor={qualifier.id}>{qualifier.label}</label>
            <span className="tooltiptext">{qualifier.value}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

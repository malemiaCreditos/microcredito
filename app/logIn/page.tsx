"use client";
import Image from "next/image";
export default function LogIn() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div>
          <div className="flex justify-center">
            <Image
              src="/imagens/malemiaLogo.png"
              alt="Logo"
              width={300}
              height={300}
              priority
            />
          </div>
          <h3
            className={`mb-3 text-4xl font-semibold text-yellow-500 text-center`}
          >
            Bem-vindo à Malemia Multicrédito
          </h3>
          <h3
            className={`mb-3 text-4xl font-semibold text-yellow-200 text-center`}
          >
            O Seu Parceiro Financeiro para o Sucesso!
          </h3>
          <br />
          <h5 className={`mb-3 text-2xl font-semibold max-w-5xl text-center`}>
            Você tem grandes sonhos, nós temos a solução! Na Malemia
            Multicrédito, estamos comprometidos em transformar sonhos em
            realidade, oferecendo acesso rápido e acessível ao crédito para você
            e sua comunidade.
          </h5>
        </div>
        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <a
            href="#"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener northerner"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>Acesso Simples </h2>
            <h3 className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Tornamos o acesso ao crédito descomplicado e acessível. Não
              importa o tamanho do seu sonho ou o seu histórico financeiro,
              estamos aqui para ajudar
            </h3>
          </a>

          <a
            href="#"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800 hover:dark:bg-opacity-30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Empréstimos Sob Medida{" "}
            </h2>
            <h3 className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Oferecemos empréstimos de pequeno valor sob medida para atender às
              suas necessidades financeiras, seja para investir em um pequeno
              negócio, educar seus filhos, ou realizar melhorias em sua casa.
            </h3>
          </a>

          <a
            href="#"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Taxas Competitivas{" "}
            </h2>
            <h3 className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Nossas taxas de juros são justas e transparentes, garantindo que
              você possa pagar sem sacrificar seu orçamento mensal.
            </h3>
          </a>

          <a
            href="#"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Apoio Personalizado:{" "}
            </h2>
            <h3 className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Na Malemia Multicrédito, não somos apenas um banco; somos um
              parceiro. Oferecemos orientação financeira, treinamento em
              empreendedorismo e suporte contínuo para ajudar você a prosperar.
            </h3>
          </a>
        </div>
      </main>
    </>
  );
}

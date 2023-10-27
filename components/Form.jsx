import React from 'react'
import Link from 'next/link';
import { useState } from 'react';

function Form(
  {type,
  evento,
  setEvento,
  submitting,
  handleSubmit}
  ) {
    const [tipoEvento, setTipoEvento] = useState(false);
  return (
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'><span className='orange_gradient'>{type} Evento</span></h1>
      <p className='desc text-left max-w-md'>
      Gerenciar um evento pode ser uma tarefa complexa e desafiadora, 
      envolvendo diversos aspectos, desde o planejamento inicial até a 
      execução e avaliação final. Nesse contexto, a plataforma de Gestão de 
      Eventos oferece inúmeras vantagens que podem facilitar e aprimorar todo o processo.
      </p>
      <div className='flex-end mx-3 mt-5 gap-4'>
          <button 
          onClick={() => setTipoEvento((prev) => !prev)}
            type='button'
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {tipoEvento ? (<>Casamento</>):(<>Outros Eventos</>)}
          </button>
      </div>
      
      {tipoEvento ? (
        <form 
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label className='font-satoshi font-semibold text-base text-gray-700'>
          Dados do Casamento
        </label>
        <input 
          value={evento.nomeNoiva}
          onChange={(e) => setEvento({ ...evento, nomeNoiva: e.target.value })}
          placeholder='Nome da Noiva'
          required
          className='form_input'
        />
        <input 
          value={evento.nomeNoivo}
          onChange={(e) => setEvento({ ...evento, nomeNoivo: e.target.value })}
          placeholder='Nome da Noivo'
          required
          className='form_input'
        />
        <input 
          value={evento.localEvento}
          onChange={(e) => setEvento({ ...evento, localEvento: e.target.value })}
          placeholder='Local do Evento'
          required
          className='form_input'
        />
        <span className='font-normal'>Data do Evento</span>
        <input 
          type='date'
          value={evento.dataEvento}
          onChange={(e) => setEvento({ ...evento, dataEvento: e.target.value })}
          placeholder='Data do Evento'
          required
          className='form_input'
        />
        <input
          value={evento.orcamentoInicial}
          onChange={(e) => setEvento({ ...evento, orcamentoInicial: e.target.value })}
          placeholder='Orçamento Inicial'
          required
          className='form_input'
        />

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href={"/"} className='text-gray-500 text-sm'>
            Cancelar
          </Link>

          <button 
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}...` : type}
          </button>

        </div>
      </form>
      ):(
        <form 
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
      >
        <label className='font-satoshi font-semibold text-base text-gray-700'>
          Dados do Evento
        </label>
        <input 
          value={evento.nomeNoivo}
          onChange={(e) => setEvento({ ...evento, nomeNoivo: e.target.value })}
          placeholder='Nome do Anfitrião'
          required
          className='form_input'
        />
        <input 
          value={evento.localEvento}
          onChange={(e) => setEvento({ ...evento, localEvento: e.target.value })}
          placeholder='Local do Evento'
          required
          className='form_input'
        />
        <span className='font-normal'>Data do Evento</span>
        <input 
          type='date'
          value={evento.dataEvento}
          onChange={(e) => setEvento({ ...evento, dataEvento: e.target.value })}
          placeholder='Data do Evento'
          required
          className='form_input'
        />
        <input
          value={evento.orcamentoInicial}
          onChange={(e) => setEvento({ ...evento, orcamentoInicial: e.target.value })}
          placeholder='Orçamento Inicial'
          required
          className='form_input'
        />

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href={"/"} className='text-gray-500 text-sm'>
            Cancelar
          </Link>

          <button 
            type='submit'
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}...` : type}
          </button>

        </div>
      </form>
      )}

      
    </section>
  )
}

export default Form
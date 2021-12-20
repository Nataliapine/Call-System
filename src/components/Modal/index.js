import './modal.scss';
import { FiX } from 'react-icons/fi';


export default function Modal({conteudo, close}) {
    
    return(
        <div className='modal'>
            <div className='container-modal'>
                <button className='close' onClick={close}>
                    <FiX size={23} color='#fff' />
                    Back
                </button>
                <div>
                    <h2>Call Details</h2>
                    <div className='row'>
                        <span>Customer: <i>{conteudo.client}</i></span>
                    </div>
                    
                    <div className='row'>
                        <span>subject: <i>{conteudo.subject}</i></span>
                    </div>

                    <div className='row'>
                        <span>registered in: <i>{conteudo.createdFormated}</i></span>
                    </div>

                    <div className='row'>
                        <span>Status: <i style={{color: '#fff', backgroundColor: conteudo.status === 'open' ? '#5cb85c' : '#999'}}>{conteudo.status}</i></span>
                    </div>

                    {conteudo.comment !== '' && (
                        <>
                            <h3>Comment</h3>
                            <p>{conteudo.comment}</p>
                        </>
                    )} 

                </div>
            </div>
        </div>
    )
}
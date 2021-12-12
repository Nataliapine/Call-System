import './new.scss';

import Header from '../../components/Header';
import Title from '../../components/Title';

export default function New() {

    function handleRegister(e) {
        e.preventDefault();
        alert('Clicou');
    }

    return (
        <div>
            <Header />

            <div className='content'>
                <Title name="New Call"></Title>
            </div>
            <div className='container'>
                <div className='card'>
                    <form className='new-form' onSubmit={handleRegister} >
                        <label>Customers</label>
                        <select>
                            <option key={1} value={1} >Maria Smith</option>
                        </select>
                        <label>Subject</label>
                        <select>
                            <option value="Suport" >Suport</option>
                            <option value="technical visit" >technical visit</option>
                            <option value="Finance" >Finance</option>
                            <option value="HR" >HR</option>
                        </select>
                        <label>Status</label>
                        <div className='status'>
                            <input type="radio" name='radio' value="open" />
                            <span>Open</span>
                            <input type="radio" name='radio' value="In Progress" />
                            <span>In Progress</span>
                        
                            <input type="radio" name='radio' value="Finished" />
                            <span>Finished</span>
                        </div>
                        <textarea type='text' placeholder='Describe your problem...' />
                        <button className="save-btn" type='submit' >Register</button>
                        
                    </form>
                </div>
            </div>
        
            
        </div>
    )
}
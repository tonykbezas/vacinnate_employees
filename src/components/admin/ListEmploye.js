import React, { useEffect, useState } from 'react'
import { helpHttp } from '../../helpers/helpHttp'
import { RowEmploye } from './RowEmploye';
import Swal from 'sweetalert2';

export const ListEmploye = () => {
    let api = helpHttp();
    let url = "http://localhost:5000/usuario";
    const [db,setDb] = useState([]);
    const [filter, setFilter] = useState('');
    const [filterDb, setFilterDb] = useState([])
    useEffect(() => {
      api.get(url).then(res => {
          if(!res.err){
              console.log(res)
              setDb(res);
          }else{
              setDb(null);
              Swal.fire('Error', res.status+': '+res.statusText,'error');
          }
      })
    }, [])

    const deleteData = (data) => {
        let confirmDelete = window.confirm(
            `¿Desea eliminar el registro ${data.nombres} ${data.apellidos}?`
        );
        if (confirmDelete){
            let endpoint = `${url}/${data.id}`;
            let options = {
                headers: {'Content-Type':'application/json'}
            }
            api.del(endpoint, options).then(res => {
                if (!res.err){
                    let newData = db.filter(el => el.id !== data.id)
                    setDb(newData);
                }else{
                    console.log('no se ha podido eliminar')
                }
            })
        }
    }

    const filtroTipoVacuna = ({target}) => {
        setFilter(target.value);
        if (target.value == "Todos"){
            setFilter('');
            setFilterDb([])
        }else{
            let newData = db.filter(el => el.tipo_vacuna === target.value)
            setFilterDb(newData);
        }
    }

    const filtroVacuna = ({target}) => {
        setFilter(target.value);
        if (target.value == "Todos"){
            setFilter('');
            setFilterDb([])
        }else{
            let newData = db.filter(el => el.vacuna === target.value)
            setFilterDb(newData);
        }
    }
    

  return (
    <>
    <div className="input-group mb-3">
        <label className="input-group-text"
           >Filtrar estado de vacunación</label>
        <select className="form-select" id="vacuna" onChange={filtroVacuna}>
            <option value="Todos">Todos</option>
            <option value="si">Si</option>
            <option value="no">No</option>
        </select>
    </div>
    <div className="input-group mb-3">
        <label className="input-group-text"
           >Filtrar tipo de vacuna</label>
        <select className="form-select" id="tipo_vacuna" onChange={filtroTipoVacuna}>
            <option value="Todos">Todos</option>
            <option value="Sputnik">Sputnik</option>
            <option value="Pfizer">Pfizer</option>
            <option value="AstraZeneca">AstraZeneca</option>
            <option value="Jhonson&Jhonson">Jhonson&Jhonson</option>
        </select>
    </div>
    <section className="section">
        <div className="row" id="basic-table">
            <div className="col-12 col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Listado de empleados</h4>
                    </div>
                    <div className="card-content">
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-lg">
                                    <thead>
                                        <tr>
                                            <th>Cédula</th>
                                            <th>Nombres</th>
                                            <th>Apellidos</th>
                                            <th>Vacunado</th>
                                            <th>Vacuna</th>
                                            <th>Usuario</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filterDb === 0 ? null:
                                            (filterDb.map((e) => <RowEmploye key={e.id} el={e} deleteData={deleteData} />))}
                                        {filter.length === 0 ? (db.map((e) => <RowEmploye key={e.id} el={e} deleteData={deleteData} />)):null}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

import React, { useContext, useEffect, useState } from 'react'
import { helpHttp } from '../../helpers/helpHttp';
import { useForm } from '../../hooks/useForm';
import { UserContext } from './UserContext';

import Swal from 'sweetalert2';
import validator from 'validator';

export const RegisterForm = () => {
    const {editData,setEditData} = useContext( UserContext );
    let initialState = {
        cedula: '',
        nombres: '',
        apellidos: '',
        correo: '',
        tipo:'',
        usuario:'',
        contrasenia: ''
    }

    const validateForm = (formValues) =>{
        let errors ={}
        let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        if (!formValues.cedula.trim()){
            errors.cedula = 'El campo "Cédula" es requerido'
        } else if (!validator.isNumeric(formValues.cedula)){
            errors.cedula = 'El campo "Cédula" puede contener solo números'
        }else if (String(formValues.cedula).length != 10){
            errors.cedula = 'El campo "Cédula" puede contener solo 10 números'
        }
        if (!formValues.nombres.trim()){
            errors.nombres = 'El campo "Nombres" es requerido'
        }else if (!regexName.test(formValues.nombres)){
            errors.nombres = 'El campo Nombres solo puede contener letras y espacios'
        }
        if (!formValues.apellidos.trim()){
            errors.apellidos = 'El campo "Apellidos" es requerido'
        }else if (!regexName.test(formValues.apellidos)){
            errors.apellidos = 'El campo Apellidos solo puede contener letras y espacios'
        }
        if (!formValues.correo.trim()){
            errors.correo = 'El campo "Correo" es requerido'
        }else if (!validator.isEmail(formValues.correo)){
            errors.correo = 'El campo "Correo" no es valido'
        }
        
        return errors;
    }

    const [ formValues, handleInputChange, setValues, handleInputBlur, error, setError ] = useForm(initialState,validateForm);
    let api = helpHttp();
    let url = "http://localhost:5000/usuario";

    useEffect(() => {
        if(editData){
            setValues(editData);
        }else{
            setValues(initialState);
        }
    }, [])
    
    const updateData = (data) => {
        let endpoint = `${url}/${data.id}`
        console.log(endpoint)
        let options = {
            body:data,
            headers: {'Content-Type':'application/json'}
        }
        api.put(endpoint, options).then(res => {
            if (!res.err){
                console.log('se ha creado correctamente')
                // setError({'message': 'Se ha creado correctamente','type':'success'})
                Swal.fire('Success', 'Se ha creado correctamente','success');
            }else{
                // setError({'message': 'No se ha podido crear','type':'error'})
                Swal.fire('Error', res.status+': '+res.statusText,'error');
                console.log('no se ha podido crear')
            }
        })
    }
    
   
    const createData = (data) => {
        data.id = Date.now();
        data.usuario = data.correo.split('@')[0] + '_' + String(data.cedula).slice(0,3);
        data.contrasenia = data.cedula;
        data.tipo = 'user';
        let options = {
            body:data,
            headers: {'Content-Type':'application/json'}
        }
        api.post(url,options).then(res => {
            if (!res.err){
                console.log('se ha actualizado correctamente')
                Swal.fire('Success', 'Se ha creado correctamente','success');
            }else{
                console.log('no se ha podido crear')
                Swal.fire('Error', res.status+': '+res.statusText,'error');
            }
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(validateForm(formValues));
        if (Object.keys(error).length === 0){
            if (formValues.id){
                updateData(formValues)
            }else{
                createData(formValues)
            }
        }else{
            return;
        }
    };
    let styles = {
        color:"red",
    }

    
  return (
    <>
    <section id="multiple-column-form">
        <div className="row match-height">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Formulario de Registro</h4>
                    </div>
                    <div className="card-content">
                        <div className="card-body">
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label>Cédula</label>
                                            <input 
                                                type="text" id="cedula" className="form-control"
                                                placeholder="Ej. 1234567890" name="cedula" 
                                                value={formValues.cedula} onChange={handleInputChange}
                                                onBlur={handleInputBlur}/>
                                            {error.cedula && <p style={styles}>* {error.cedula}</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label >Nombres</label>
                                            <input type="text" id="nombres" className="form-control"
                                                placeholder="Ej. Juan Román" 
                                                name="nombres" value={formValues.nombres} 
                                                onChange={handleInputChange}
                                                onBlur={handleInputBlur}/>
                                                {error.nombres && <p style={styles}>* {error.nombres}</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label >Apellidos</label>
                                            <input type="text" id="apellidos" className="form-control"
                                                placeholder="Ej. Riquelme" name="apellidos" 
                                                value={formValues.apellidos} onChange={handleInputChange}
                                                onBlur={handleInputBlur}/>
                                                {error.apellidos && <p style={styles}>* {error.apellidos}</p>}
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-12">
                                        <div className="form-group">
                                            <label >Correo Electrónico</label>
                                            <input type="email" id="correo" className="form-control"
                                                name="correo" value={formValues.correo} 
                                                placeholder="Ej. j_riquelme@kruger.com" onChange={handleInputChange}
                                                onBlur={handleInputBlur}/>
                                                {error.correo && <p style={styles}>* {error.correo}</p>}
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex justify-content-end">
                                        <button type="submit"
                                            className="btn btn-primary me-1 mb-1">Guardar</button>
                                        <button type="reset"
                                            className="btn btn-light-secondary me-1 mb-1">Limpiar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}


package pe.edu.vallegrande.crudregistro.service;

import pe.edu.vallegrande.crudregistro.model.PeriodoAcademico;

import java.util.List;

public interface PeriodoAcademicoService {

    List<PeriodoAcademico> listar();

    PeriodoAcademico buscarPorId(Integer id);

    PeriodoAcademico registrar(PeriodoAcademico periodo);

    PeriodoAcademico actualizar(
            Integer id,
            PeriodoAcademico periodo
    );

    void eliminar(Integer id);
}


package pe.edu.vallegrande.crudregistro.service;

import pe.edu.vallegrande.crudregistro.model.AsignacionDocente;
import java.util.List;

public interface AsignacionDocenteService {

    List<AsignacionDocente> listarTodas();

    AsignacionDocente buscarPorId(Integer id);

    AsignacionDocente guardar(AsignacionDocente asignacion);

    AsignacionDocente actualizar(
            Integer id, AsignacionDocente asignacion);

    void eliminar(Integer id);
}

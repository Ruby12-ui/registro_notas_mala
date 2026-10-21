
package pe.edu.vallegrande.crudregistro.service;

import pe.edu.vallegrande.crudregistro.model.Asistencia;
import java.util.List;

public interface AsistenciaService {

    List<Asistencia> listarTodas();

    Asistencia buscarPorId(Integer id);

    Asistencia guardar(Asistencia asistencia);

    Asistencia actualizar(Integer id, Asistencia asistencia);

    void eliminar(Integer id);
}

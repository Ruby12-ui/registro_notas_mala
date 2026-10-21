
package pe.edu.vallegrande.crudregistro.service;

import pe.edu.vallegrande.crudregistro.model.Seccion;
import java.util.List;

public interface SeccionService {

    List<Seccion> listarTodas();

    List<Seccion> listarPorGrado(Integer gradoId);

    Seccion buscarPorId(Integer id);

    Seccion guardar(Seccion seccion);

    Seccion actualizar(Integer id, Seccion seccion);

    void eliminar(Integer id);
}

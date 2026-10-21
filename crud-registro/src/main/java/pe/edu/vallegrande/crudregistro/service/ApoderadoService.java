
package pe.edu.vallegrande.crudregistro.service;

import pe.edu.vallegrande.crudregistro.model.Apoderado;
import java.util.List;

public interface ApoderadoService {

    List<Apoderado> listarTodos();

    Apoderado buscarPorId(Integer id);

    Apoderado guardar(Apoderado apoderado);

    Apoderado actualizar(Integer id, Apoderado apoderado);

    void eliminar(Integer id);
}

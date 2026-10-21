
package pe.edu.vallegrande.crudregistro.service;

import pe.edu.vallegrande.crudregistro.model.Nota;
import java.util.List;

public interface NotaService {

    List<Nota> listarTodas();

    Nota buscarPorId(Integer id);

    Nota guardar(Nota nota);

    Nota actualizar(Integer id, Nota nota);

    void eliminar(Integer id);
}

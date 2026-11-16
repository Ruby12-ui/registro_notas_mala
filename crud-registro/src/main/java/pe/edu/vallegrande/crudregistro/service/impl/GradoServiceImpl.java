
package pe.edu.vallegrande.crudregistro.service.impl;

import pe.edu.vallegrande.crudregistro.model.Grado;
import pe.edu.vallegrande.crudregistro.repository.GradoRepository;
import pe.edu.vallegrande.crudregistro.service.GradoService;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional
public class GradoServiceImpl implements GradoService {

    private final GradoRepository gradoRepository;

    public GradoServiceImpl(GradoRepository gradoRepository) {
        this.gradoRepository = gradoRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Grado> listarTodos() {
        return gradoRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Grado buscarPorId(Integer id) {
        return gradoRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No se encontró el grado con ID: " + id
                ));
    }

    @Override
    public Grado guardar(Grado grado) {
        grado.setId(null);
        return gradoRepository.save(grado);
    }

    @Override
    public Grado actualizar(Integer id, Grado datos) {
        Grado existente = buscarPorId(id);

        existente.setNombre(datos.getNombre());
        existente.setNivelEducativo(datos.getNivelEducativo());

        return gradoRepository.save(existente);
    }

    @Override
    public void eliminar(Integer id) {
        Grado grado = buscarPorId(id);
        gradoRepository.delete(grado);
    }
}

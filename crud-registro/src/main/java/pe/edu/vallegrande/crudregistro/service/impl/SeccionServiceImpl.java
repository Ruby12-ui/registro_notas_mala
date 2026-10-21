
package pe.edu.vallegrande.crudregistro.service.impl;

import pe.edu.vallegrande.crudregistro.model.Seccion;
import pe.edu.vallegrande.crudregistro.repository.SeccionRepository;
import pe.edu.vallegrande.crudregistro.repository.GradoRepository;
import pe.edu.vallegrande.crudregistro.service.SeccionService;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@Transactional
public class SeccionServiceImpl implements SeccionService {

    private final SeccionRepository seccionRepository;
    private final GradoRepository gradoRepository;

    public SeccionServiceImpl(
            SeccionRepository seccionRepository,
            GradoRepository gradoRepository) {
        this.seccionRepository = seccionRepository;
        this.gradoRepository = gradoRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Seccion> listarTodas() {
        return seccionRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Seccion> listarPorGrado(Integer gradoId) {
        if (!gradoRepository.existsById(gradoId)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "No se encontró el grado con ID: " + gradoId
            );
        }

        return seccionRepository.findByGradoId(gradoId);
    }

    @Override
    @Transactional(readOnly = true)
    public Seccion buscarPorId(Integer id) {
        return seccionRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "No se encontró la sección con ID: " + id
                ));
    }

    @Override
    public Seccion guardar(Seccion seccion) {
        seccion.setId(null);
        validarGrado(seccion.getGradoId());
        return seccionRepository.save(seccion);
    }

    @Override
    public Seccion actualizar(Integer id, Seccion datos) {
        Seccion existente = buscarPorId(id);

        validarGrado(datos.getGradoId());

        existente.setNombre(datos.getNombre());
        existente.setGradoId(datos.getGradoId());

        return seccionRepository.save(existente);
    }

    private void validarGrado(Integer gradoId) {
        if (gradoId == null || !gradoRepository.existsById(gradoId)) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "El grado indicado no existe"
            );
        }
    }

    @Override
    public void eliminar(Integer id) {
        Seccion seccion = buscarPorId(id);
        seccionRepository.delete(seccion);
    }
}

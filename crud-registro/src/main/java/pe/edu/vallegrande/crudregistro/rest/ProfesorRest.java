package pe.edu.vallegrande.crudregistro.rest;

import pe.edu.vallegrande.crudregistro.model.Profesor;
import pe.edu.vallegrande.crudregistro.service.ProfesorService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profesores")
@CrossOrigin(origins = "http://localhost:4200")
public class ProfesorRest {

    private final ProfesorService profesorService;

    public ProfesorRest(ProfesorService profesorService) {
        this.profesorService = profesorService;
    }

    @GetMapping
    public ResponseEntity<List<Profesor>> listarTodos() {
        return ResponseEntity.ok(
                profesorService.listarTodos()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profesor> buscarPorId(
            @PathVariable Integer id
    ) {
        return profesorService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }

    @PostMapping
    public ResponseEntity<Profesor> crear(
            @RequestBody Profesor profesor
    ) {
        Profesor nuevo = profesorService.guardar(profesor);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(nuevo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profesor> actualizar(
            @PathVariable Integer id,
            @RequestBody Profesor profesor
    ) {
        return profesorService.actualizar(id, profesor)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Integer id
    ) {
        if (profesorService.eliminar(id)) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }
}


package pe.edu.vallegrande.crudregistro.rest;

import pe.edu.vallegrande.crudregistro.model.Curso;
import pe.edu.vallegrande.crudregistro.service.CursoService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cursos")
@CrossOrigin(origins = "http://localhost:4200")
public class CursoRest {

    private final CursoService cursoService;

    public CursoRest(CursoService cursoService) {
        this.cursoService = cursoService;
    }

    @GetMapping
    public ResponseEntity<List<Curso>> listarTodos() {
        return ResponseEntity.ok(cursoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Curso> buscarPorId(
            @PathVariable Integer id) {
        return ResponseEntity.ok(cursoService.buscarPorId(id));
    }

    @PostMapping
    public ResponseEntity<Curso> guardar(
            @RequestBody Curso curso) {
        Curso nuevo = cursoService.guardar(curso);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(nuevo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Curso> actualizar(
            @PathVariable Integer id,
            @RequestBody Curso curso) {
        return ResponseEntity.ok(
                cursoService.actualizar(id, curso));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(
            @PathVariable Integer id) {
        cursoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}

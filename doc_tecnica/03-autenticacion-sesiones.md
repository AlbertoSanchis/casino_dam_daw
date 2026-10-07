# 03 · Autenticación y sesiones



## Variables de sesión

Se crean en `login.php` tras validar las credenciales:

|Variable|Tipo|Uso|
|-|-|-|
|`$\_SESSION\['id']`|int|Identifica al usuario en todas las consultas|
|`$\_SESSION\['usuario']`|string|Login|
|`$\_SESSION\['nombre']`|string|Saludo de la landing|
|`$\_SESSION\['rol']`|string|`jugador` o `admin`|

> El \*\*saldo NO se guarda en sesión\*\*: cambia con cada jugada y desde el admin, así que se consulta siempre a la BD.

## Flujo de login

```
POST login.php (usuario, password)
  │
  ├─ campos vacíos ───────────────▶ error "Rellena todos los campos"
  ├─ SELECT … WHERE usuario = ?
  ├─ no existe / !password\_verify ▶ error genérico "Usuario o contraseña incorrectos"
  ├─ activo = 0 ──────────────────▶ error "Cuenta desactivada"
  │
  └─ OK:
       session\_regenerate\_id(true)
       $\_SESSION\[...] = ...
      

&#x20;      header('Location: landing.php')   (admin → también puede ir a admin/)
```

## `login.php` (núcleo)

Sirve para loguearse el usuario y guardar las variables de sesión

## Protección de páginas (`includes/auth.php`)



Uso: la **primera línea** de cada página protegida.

|Página|Llamada|
|-|-|
|`landing.php`, `juegos/\*.php`|`requiere\_login();`|
|`admin/\*.php`|`requiere\_admin();`|
|`juegos/api/jugar.php`|`requiere\_login();` (responde JSON 401 en vez de redirigir)|

## Logout (`logout.php`)



Cerrar la sesión

## Consideraciones

* Si el admin desactiva o borra a un usuario con sesión abierta, `requiere\_login()` puede comprobar además `activo` en BD (mejora opcional).
* El mensaje de error es **genérico** para no revelar si el usuario existe.


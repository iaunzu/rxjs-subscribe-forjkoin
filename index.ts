import { Observable, timer, forkJoin } from 'rxjs'; 
import { map } from 'rxjs/operators';

function getUser(id: number, delay = 1000): Observable<any> {
  return timer(delay).pipe(
    map( _ => ({ id, name: 'test' + id}))
  );
}

const user1$ = getUser(1);
const user2$ = getUser(2);

user1$.subscribe(console.log);
user2$.subscribe(console.log);

const t0 = Date.now();
user1$.subscribe(u1 => {
  user2$.subscribe(u2 => {
    console.log(Date.now() - t0, `A) u1 es ${JSON.stringify(u1)} y u2 es ${JSON.stringify(u2)}`)
  });
});

forkJoin(user1$, user2$).subscribe(([u1,u2]) => {
  console.log(Date.now() - t0, `B) u1 es ${JSON.stringify(u1)} y u2 es ${JSON.stringify(u2)}`)
});
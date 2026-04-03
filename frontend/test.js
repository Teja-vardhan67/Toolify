async function test() {
  try {
    const res = await fetch('http://localhost:8081/api/tools', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Drill', ownerId: '123' })
    });
    const text = await res.text();
    console.log('STATUS:', res.status, 'BODY:', text);
  } catch (err) {
    console.error('ERROR:', err);
  }
}
test();

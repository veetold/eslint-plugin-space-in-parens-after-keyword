// enforce-foo-bar.test.js
const {RuleTester} = require("eslint");
const enforce = require("./enforce");

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2015 }
});

ruleTester.run(
  "enforce",
  enforce,
  {
    valid: [
      {
        code:
        `
if( false ) {}
while( false ) {}
try {} catch( e ) {}
for( 0;0;0 ) {}
for( var x of y ) {}
switch( x ) {}
      `,
      }
    ],
    invalid: [
      {
        code: 'if (false) {}',
        output: 'if ( false ) {}',
        errors: 2,
      },
      {
        code: 'while (false) {}',
        output: 'while ( false ) {}',
        errors: 2,
      },
      {
        code: 'try {} catch (e) {}',
        output: 'try {} catch ( e ) {}',
        errors: 2,
      },
      {
        code: 'for (0;0;0) {}',
        output: 'for ( 0;0;0 ) {}',
        errors: 2,
      },
      {
        code: 'for (var x of y) {}',
        output: 'for ( var x of y ) {}',
        errors: 2,
      },
      {
        code: 'switch (x) {}',
        output: 'switch ( x ) {}',
        errors: 2,
      }
    ]
  }
);

console.log("All tests passed.");
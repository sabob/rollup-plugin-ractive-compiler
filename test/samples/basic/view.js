import template from './template.html';
import Ractive from 'ractive';

let view = new Ractive({
		template: template,
		
		data: {
			answer: 42
		}
	});

assert.equal( view.toHTML(), '<p>the answer is 42</p>' );
assert.equal( view.get( 'answer' ), 42 );
assert.equal( 'object', typeof template, 'template is compiled so must be of type object' );

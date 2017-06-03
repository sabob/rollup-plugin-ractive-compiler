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

assert.equal( 'string', typeof template, 'template is NOT compiled so must be of type string' );

assert.equal( template, '<p>the answer is {{answer}}</p>\n', 'template is NOT compiled so must equal its value');
